import { FaRegUser, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "../src/static/logo-no-background.png";
import { Link, redirect } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {registerUser, reset} from './puck/auth/authSlice'
import Spinner from './Spinner'


function Register() {
  const [userinfo, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = userinfo;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isSuccess, isError, isLoading, message} = useSelector(state => state.auth)
  
  useEffect(
    () => {
      if(isError){
        toast.error(message)
      }
      if(isSuccess || user){
        navigate('/dashboard')
      }
      dispatch(reset())
    }
  , [user,isLoading,isError, isSuccess,message])
  
  const onChange = (e) => setUser({ ...userinfo, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('passwords do not match')
    }
    else if(name===''||email===''||password===''||password2===''){
      toast.error('Fill out all fields')
    } 
    else {
      const userData = {
        name,
        email,
        password,
        password2
      };
      dispatch(registerUser(userData));
      dispatch(reset())
      }
    }
    if(user){
      redirect('/dashboard');
    }
  return (<>
    {isLoading ? <Spinner/> : null}
    <div className="w-screen h-screen sm:w-screen md:w-screen border sm:h-screen md:h-screen bg-slate-900 flex flex-col justify-evenly items-center font-serif">
        <div className="h-1/5 w-full text-gray-300  flex flex-col justify-evenly items-center space-y-2">
          <img srcSet={logo} alt="logo" className="h-4/5 aspect-video" />
          <div className="flex justify-evenly w-min items-center">
            <FaRegUser className="" />
            <h1 className="text-gray-300 text-2xl text-center ml-3 font-bold tracking-widest underline decoration-2  underline-offset-4 decoration-gray-300">
              Sign_up
            </h1>
          </div>
        </div>
        <section className="h-3/6 w-4/5 sm:w-full sm:h-full md:w-3/5 md:h-3/5">
          <form
            className="w-full h-full flex flex-col justify-evenly items-center text-gray-300 px-2 bg-gray-900 outline outline-gray-300/50 hover:outline-gray-300  outline-offset-4 rounded-xl" onSubmit={onSubmit}
          >
            <div className="w-full flex flex-col justify-around">
              <label htmlFor="name" className="w-full">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
                className="w-full rounded-sm text-black py-1 px-2"
              />
            </div>
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
            <div className="w-full flex flex-col justify-around">
              <label htmlFor="password2" className="w-full">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirm your password"
                className="w-full rounded-sm text-black py-1 px-2"
              />
            </div>
            <button type="submit" className="text-white font-bold bg-blue-600 w-4/5 text-center rounded-lg py-1">
            Sign up
            </button>
          </form>
        </section>
        <Link
          to="/login"
          className="text-gray-300 bg-blue-600 w-4/5 text-center rounded-lg flex flex-col items-center py-1"
        >
          <small>Already have an account</small>
          <h3 className="text-white font-bold">log in</h3>
        </Link>
      </div>
      </>
  );

  }
export default Register;
  