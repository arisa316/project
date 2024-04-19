import React, { useState, FC } from "react";
import { Link,useNavigate  } from "react-router-dom";
import Swal from "sweetalert2";
import { LandingIntro } from "../../components/LandingIntro";
import axios from "axios";

// interface LoginProps {
//   url: string;
//   user: object;
//   setUser: (user: object) => void;
// }

// export const Login: FC<LoginProps> = ({ url, user, setUser }) => {

export const Login: FC = ({url,data,setUser,setConversation}) => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  async function getConverssation(id:Number){
    console.log(id)
    const res = await axios.get(`${url}/participates/${id}`);
    // const filteredItems = res.data.filter((item:object) => item.user.id === id);
    console.log(res.data)
    setConversation(res.data);
  }


  async function handleSubmit(event) {

    event.preventDefault();

    if(!username||!password){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'username and password is required!',
        text: 'please try again.',
        showConfirmButton: false,
        timer: 2000
      });
    }else{
      const filteredUser = data.find(user => user.name === username && user.password === password);
        if (!filteredUser) {
          Swal.fire({
            icon: 'error',
            title: 'account not found !',
            text: 'Oops...Something went wrong!',
            footer: 'Wrong user or password'
          })
        } else {
          setUser(filteredUser)
          getConverssation(filteredUser.id)
          console.log(filteredUser)
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
    }
  }



  return (
    <>
      <div className="min-h-screen bg-base-200 flex items-center">
        <div className="card mx-auto w-full max-w-5xl  shadow-xl">
          <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
            <div className="">
              <LandingIntro />
            </div>
            <div className="py-24 px-10 space-y-10">
              <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4 space-y-8">
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" className="grow" placeholder="Email" onChange={(event) => { setUsername(event.target.value) }} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </label>
                </div>

                {/* <button className={"btn mt-2 w-full btn-primary"} type="submit" ><Link to={username === "addmin" ? "/Admin" : "/"}>Login</Link></button> */}
                <button className={"btn mt-2 w-full btn-primary"} type="submit" >Login</button>

                <div className='text-center mt-4'>Don't have an account yet? 
                    <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                      <Link to={`/register`}>Register</Link>
                    </span>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
