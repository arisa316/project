import React, { FC } from "react";
import { Link } from "react-router-dom";
import pic from '../assets/pic-1.jpeg'; // Import the image directly

export const LandingIntro: FC = () => {

  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold ">
            <img
              src={pic}
              className="w-25 inline-block mr-2 mask"
              alt="dashwind-logo"
            />  
          </h1>
        </div>
      </div>
    </div>
  );
};
