import React, { useEffect, useState, FC } from "react";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { LeftSideBar } from "../../components/LeftSideBar";
import { User } from "../../components/content/User";

export const Home: FC = ({data,user,setUser,url,conversation,setConversation,setChat,chatId, setChatId ,socket}) => {
  return (
    <>
    
      <Navbar user={user} setUser={setUser} setConversation={setConversation} />

      <div className="flex h-dvh">

        <LeftSideBar conversation={conversation} url={url} setChat={setChat} chatId={chatId} setChatId={setChatId} socket={socket} />

        <User data={data} user={user} url={url} conversation={conversation} setConversation={setConversation} setChat={setChat} chatId={chatId} setChatId={setChatId} socket={socket} />

      </div>
    </>
  );
};
