import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Conversation } from "./entity/Conversation";
import { Message } from "./entity/Message";
import { Participate } from "./entity/Participate";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "!QAZ2wsx",
    database: "project",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Conversation,
        Message,
        Participate
    ],
    migrations: [],
    subscribers: [],
})

