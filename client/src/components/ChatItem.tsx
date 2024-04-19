import React, { useEffect, useState, FC } from "react";

export const ChatItem: FC = ({ user, item }) => {
  return (
    <>
      {item.user.id === user.id ? (
        <div className="chat chat-end shadow-b-4xl ">
          <div className="chat-bubble">{item.content}</div>
        </div>
      ) : (
        <div className="chat chat-start shadow-b-4xl z-10">
          <img
            className="w-12 inline-block mr-2 mask mask-circle"
            src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg"
          />
          <div className="chat-bubble">
          {item.content}
          </div>
        </div>
      )}
    </>
  );
};
