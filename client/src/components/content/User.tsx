import React, { useEffect, useState, FC } from "react";

import { Card } from "../../components/Card";

export const User: FC = ({ data, user, url, conversation, setConversation,setChat ,chatId,setChatId,socket}) => {
  return (
    <>
      <div className="w-full overflow-y-scroll bg-base-200 flex flex-col">
        <div className="flex justify-center text-4xl m-10 ">Chat with me!</div>

        <div className="flex flex-wrap gap-4 justify-center">

          {Object.keys(data).length !== 0
            ? data
                .filter((item) => item.id !== user.id) // Ignore items with id equal to 1
                .map((item) => (
                  <Card key={item.id} item={item} user={user} url={url} conversation={conversation} setConversation={setConversation} setChat={setChat} setChatId={setChatId} socket={socket} />
                ))
            : null}

        </div>
      </div>
    </>
  );
};
