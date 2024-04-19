import React, { useEffect, useState, FC } from "react";
import pic from "../assets/pic-1.jpeg";
import { Link , useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const Card: FC = ({ user, url, item, conversation, setConversation ,setChat,setChatId,socket }) => {

  const navigate = useNavigate();

  function popup() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please log in before use!",
      text: "Please try again.",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate('/login');
    });
  }

  async function newRelation(){
    const req = await axios.post(`${url}/conversations`,{ "name": "test","type" : "tt","image": "test"});
    await axios.post(`${url}/participates`,{"userId" : user.id , "conversation" : req.data.id});
    await axios.post(`${url}/participates`,{"userId" : item.id , "conversation" : req.data.id});
    const resConver = await axios.get(`${url}/participates/${user.id}`);
    setConversation(resConver.data);
    await resChat(req.data.id);
  }

  async function resChat(id:number){
    const resChat = await axios.get(`${url}/messages/${id}`);
    setChat(resChat.data)
    setChatId(id)
  }

  async function openChat() {
    try {
      const res = await axios.get(`${url}/participates/${item.id}`);

      const participantConversations = conversation.find(participant => {
        return res.data.some(item => participant.conversation.id === item.conversation.id);
      });

      if(participantConversations){
        await resChat(participantConversations.conversation.id)
        console.log('chat with me agian!')
        navigate('/chat');
      }else{
        await newRelation();
        console.log('create new!')
        navigate('/chat');
      }

      console.log(participantConversations)

    } catch (error) {
      console.error('Error in openChat:', error);
    }
    
  }
  

  return (
    <>
      <div className="card card-compact w-64 bg-base-100 shadow-xl">
        <figure>
          <img src={pic} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>

          <div className="card-actions justify-end">

            {Object.keys(user).length !== 0 ? (
               <button className="btn btn-primary" onClick={openChat}>
               Chat
             </button>
            ) : (
              <button className="btn btn-primary" onClick={popup}>
                Chat
              </button>
            )}

          </div>
        </div>
      </div>
    </>
  );
};
