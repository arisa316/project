import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Server, Socket } from 'socket.io';

const cors = require("cors");
const http = require("http");

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    const server = http.createServer(app);
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    

    const corsOptions = {
        origin: "http://localhost:5173",
        methods: ['*'], // Allow PUT and DELETE methods
      }; 
      app.use(cors(corsOptions));

    const io = new Server(server, {
        cors: {
          origin: "*", // อนุญาตเฉพาะต้นทางนี้เท่านั้น
          methods: ["*"],
        },
    });

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })


    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
      
        socket.on("send_message", (data) => {
          const { messageData, chatId } = data; // Destructure 'message' and 'room' from 'data'
          socket.to(chatId).emit("receive_message", messageData); // Emit 'message' instead of 'data'
          console.log(messageData);
          console.log(data);
        });
      
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
      });
      
      server.listen(3000, () => {
        console.log("SERVER RUNNING");
      });

    // start express server
    // app.listen(3000)

    // insert new users for test


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))

// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
// import { AppDataSource } from "./data-source";
// import { Routes } from "./routes";
// const cors = require("cors");
// const http = require("http");
// import { Server, Socket } from "socket.io";

// AppDataSource.initialize().then(async () => {
//   const app = express();
//   const server = http.createServer(app);
//   const io = new Server(server);

//   app.use(bodyParser.json());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));

//   const corsOptions = {
//     origin: "http://localhost:5173",
//     methods: ['*'], // Allow PUT and DELETE methods
//   };
//   app.use(cors(corsOptions));

//     // register express routes from defined application routes
//     Routes.forEach(route => {
//         (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//             const result = (new (route.controller as any))[route.action](req, res, next)
//             if (result instanceof Promise) {
//                 result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

//             } else if (result !== null && result !== undefined) {
//                 res.json(result)
//             }
//         })
//     })

//   io.on("connection", (socket: Socket) => {
//     console.log("A user connected");

//     socket.on("chat message", (msg: string) => {
//       console.log("Message received from client:", msg);
//       io.emit("chat message", msg);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });

//   server.listen(3000, () => {
//     console.log("Express server and Socket.IO server have started on port 3000");
//   });

//   console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
// }).catch((error) => console.log(error));

