import React, { useState, FC } from "react";
import { Link , useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import pic from "../assets/pic-1.jpeg";

export const Navbar: FC = ({user,setUser,setConversation}) => {

  const navigate = useNavigate();

  function logOut() {
    setUser({});
    setConversation({});
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      navigate('/');
    });

  }

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100 z-30 shadow-md ">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold ml-2"></h1>
        </div>
        <div className="flex-none ">
          <label className="swap ">
            <input type="checkbox" />
          </label>

          {Object.keys(user).length === 0 ? null : 
            <input
              type="text"
              placeholder="Type here"
              className="input w-full input-bordered shadow-t-xxl items-center mr-8"
            />    
          }
          
          <div className="mr-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Link to={`/`}>
                  <img src={pic} alt="profile" />
                </Link>
              </div>
            </label>
          </div>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end mr-8 ml-4 ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={pic} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>

              {Object.keys(user).length === 0 ?
                <Link to={`/login`}>Login</Link>
                :
                <Link to={`/`} onClick={logOut}>Logout</Link>
              }
              
              </li>
            </ul>


          </div>
        </div>
      </div>
    </>
  );
};
