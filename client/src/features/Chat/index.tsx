import React, { useEffect, useState, FC } from "react";
// import TitleCard from "../../components/Cards/TitleCard"
import { Navbar } from "../../components/Navbar";
import { ChatItem } from "../../components/ChatItem";
import { LeftSideBar } from "../../components/LeftSideBar";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

export const Chat: FC = ({data,user,setUser,url,conversation,setConversation,chat,setChat,chatId, setChatId,socket}) => {

  const [messages, setMessage] = useState<string>("");

  async function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
    if (event.key === "Enter") {
      await sendMessage();
    }
  };

//   async function sendMessage() {
//     console.log("Sending message:", messages);
//     const req = await axios.post(`${url}/messages`, { conversationId: chatId, user: user.id, content: messages });
//     if(messages!==""){
//       const messageData = {
//         ...req.data,user:user
//       };
//       await socket.emit("send_message", {messageData,chatId});
      
//       // setMessageList((list) => [...list, messageData]);
//       setChat([...chat, messageData]);
//       setMessage("");
//   }
// }

async function sendMessage() {
  console.log("Sending message:", messages);
  if (messages.trim() !== "") { // Check for non-empty and non-whitespace messages
    const req = await axios.post(`${url}/messages`, { conversationId: chatId, user: user.id, content: messages });
    const messageData = {
      ...req.data,
      user: user
    };
    console.log("Sending message:", messageData);
    await socket.emit("send_message", { messageData, chatId });

    // Update state after emitting the message
    setChat([...chat, messageData]);
    setMessage(""); // Clear the input field after sending the message
  }
}




  useEffect(() => {
    socket.on("receive_message", (data:any) => {
      console.log("socket")
      // setMessageList((list) => [...list, data]);
      setChat([...chat, data]);
    });
  }, [socket]);


  return (
    <>
      <Navbar user={user} setUser={setUser} setConversation={setConversation} />

      <div className="flex h-dvh">

      <LeftSideBar conversation={conversation} url={url} setChat={setChat} chatId={chatId} setChatId={setChatId} socket={socket} />

        <div className="w-full overflow-y-scroll">
          <ScrollToBottom className="flex-1 bg-base-200 h-full p-20 overflow-y-scroll shadow-b-xxl">

            {Object.keys(chat).length !== 0
            ? chat.map((item) => (
                  <ChatItem key={item.id} user={user} item={item} socket={socket}   />
                  
                ))
            : null}

            <input
              type="text"
              placeholder="Type here"
              className="input w-full mt-10 input-bordered shadow-t-xxl"
              onChange={(event) => { setMessage(event.target.value) }}
              value={messages}
              onKeyPress={handleKeyPress} 
            />
          </ScrollToBottom>
        </div>
        </div>
      
    </>
  );
};
