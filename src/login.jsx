import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../src/static/logo-no-background.png";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {registerUser, reset, loginUser} from './puck/auth/authSlice'
import { login } from "./puck/auth/authService";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isSuccess, isError, isLoading, message} = useSelector((state)=>state.auth);

  const [userinfo, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    if(user || isSuccess){
      navigate('/dashboard');
      dispatch(reset());
    }
    if(isError){
      toast.error(message)
    }
  },[user, isSuccess, isError, isLoading, message])

  const { email, password } = userinfo;
  
  const onChange = (e) => setUser({ ...userinfo, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userinfo));
  };
  if(user || isSuccess){
    redirect('/dashboard')
  }

  return (
    <div className="w-screen h-screen sm:w-screen md:w-screen border sm:h-screen md:h-screen bg-gray-900 flex flex-col justify-evenly items-center font-serif">
      <div className="h-1/5 w-full text-gray-300  flex flex-col justify-evenly items-center space-y-2">
        <img src={logo} alt="logo" className="h-4/5 aspect-video" />
        <div className="flex justify-evenly w-min items-center">
          <FaSignInAlt className="" />
          <h1 className="text-gray-300 text-2xl text-center ml-3 tracking-widest font-bold underline">
            Log_in
          </h1>
        </div>
      </div>
      <section className="h-2/5 w-4/5 sm:w-full sm:h-full md:w-3/5 md:h-3/5">
        <form
          className="w-full h-full flex flex-col justify-evenly items-center text-gray-300 px-2 bg-gray-800 outline outline-gray-300/50 hover:outline-gray-300  outline-offset-4   rounded-xl"
          onSubmit={onSubmit}
        >
          <div className="w-full flex flex-col justify-around">
            <label htmlFor="email" className="w-full ">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full rounded-sm text-black py-1 px-2"
            />
          </div>
          <div className="w-full flex flex-col justify-around">
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              className="w-full rounded-sm text-black py-1 px-2"
            />
          </div>
          <button type="submit" className="text-gray-300 hover:text-white bg-blue-600 w-4/5 text-center rounded-lg" >Log in</button>
        </form>
      </section>
      <Link
        to="/signup"
        className="text-gray-300 hover:text-white bg-blue-600 w-4/5 text-center rounded-lg flex flex-col items-center"
      >
        <small>Haven't create account yet</small>
        <h3 className="text-white">Create an account</h3>
      </Link>
    </div>
  );
}

export default Login;
