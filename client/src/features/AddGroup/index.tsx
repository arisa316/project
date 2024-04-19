import React, { useEffect, useState, FC } from "react";
// import TitleCard from "../../components/Cards/TitleCard"
import { Navbar } from "../../components/Navbar";
import { UserItem } from "../../components/UserItem";
import { Card } from "../../components/Card";
import { AlerGroup } from "../../components/AlertGroup";

export const AddGroup: FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-dvh">
        <div className="flex-3 overflow-y-scroll shadow-r-2xl">
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
        </div>
        <div className="w-full overflow-y-scroll bg-base-200 flex flex-col">

            <div className="flex justify-center text-4xl m-10 ">Chat with me!</div>

        <div className="flex flex-wrap gap-4 justify-center">

          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>

          <AlerGroup/>

          </div>
          
        </div>
      </div>
    </>
  );
};
