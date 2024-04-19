import React, { useState, FC, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Login } from "./features/Login";
import { Register } from "./features/Register";
import { Home } from "./features/Home";
import { Chat } from "./features/Chat";
import { Routes, Route } from "react-router-dom";
import io from 'socket.io-client';


const url: string = "http://localhost:3000";


export const App: FC = () => {
  
  const [user, setUser] = useState<object>({});
  const [data, setData] = useState<object>({});
  const [conversation, setConversation] = useState<object>({});
  const [chat, setChat] = useState<object>({});
  const [chatId, setChatId] = useState<number>();
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    async function getData() {
      try {
        const users = await axios.get(`${url}/users`);
        setData(users.data);
        console.log(users.data);
        const newSocket = io(url); // Create new Socket.IO instance
        setSocket(newSocket);
        return () => {
          newSocket.disconnect(); // Clean up on unmount
        };
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if(Object.keys(user).length !== 0 && chatId !== undefined){
      socket.emit("join_room", chatId);
      console.log(`join room + ${chatId}`)
    }else{
      console.log("what")
    }
    
  }, [chatId]);






  return (
    <>

      <Routes>
        <Route path="/login" element={<Login url={url} data={data} setUser={setUser} setConversation={setConversation} />}/>
        <Route path="/register" element={<Register url={url} data={data} setData={setData}/>}/>
        <Route path="/chat" element={<Chat data={data} user={user} setUser={setUser} url={url} conversation={conversation} setConversation={setConversation} chat={chat} setChat={setChat} chatId={chatId} setChatId={setChatId} socket={socket} />}/>
        <Route path="/" element={<Home data={data} user={user} setUser={setUser} url={url} conversation={conversation} setConversation={setConversation} setChat={setChat} chatId={chatId} setChatId={setChatId} socket={socket} />} />
      </Routes>

    </>
  );
};
