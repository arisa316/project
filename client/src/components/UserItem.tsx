import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";

export const UserItem: FC = ({url,item,setChat,setChatId,socket}) => {

  const navigate = useNavigate();

  async function resChat(id:number){
    const resChat = await axios.get(`${url}/messages/${id}`);
    setChat(resChat.data)
    setChatId(id)
    navigate('/chat');
  }

  async function click(){
    await resChat(item.conversation.id)
  }

  return (
    <>
          <ul className="menu w-64 rounded-box mr-20">
            <li onClick={click}>
              <a>
              <img className="w-12 inline-block mr-2 mask mask-circle" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"/>
                {item.user.name}
              </a>
            </li>
          </ul>
    </>
  );
};
