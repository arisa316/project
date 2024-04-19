import React, { FC } from "react";
import { UserItem } from "../components/UserItem";


export const LeftSideBar: FC = ({url,conversation,setChat,chatId,setChatId,socket }) => {
  return (
    <>
        <div className="flex-3 overflow-y-scroll shadow-r-2xl">
        <ul className="menu w-64 rounded-box mr-20">
        </ul>
        {Object.keys(conversation).length !== 0 ? 
             conversation.map((item)=>(<UserItem key={item.id} url={url} item={item} setChat={setChat} setChatId={setChatId} socket={socket} />))
          : null}
        </div>

    </>
  );
};
