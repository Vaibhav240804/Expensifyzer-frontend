import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { registerUser, reset, resetAll } from "./puck/auth/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openEdit, openExpense, openLog } from "./puck/dash/dashSlice";
import { getReport } from "./puck/Expenses/ExpenseSlice";
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import EditExp from "./EditExp";
import axios from "axios";
import ExpenseReport from "./pdf";
// require("dotenv").config();

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const { addExpense, log, edit } = useSelector((state) => state.dash);
  useEffect(() => {
    if(!user){
        navigate('/signup');
    }
  }, [addExpense, log, edit, user]);

  return (
    <div className="text-white w-screen max-h-max min-h-screen flex flex-col justify-around items-center bg-stone-300 p-0 m-0 absolute left-0 right-0 top-0 bottom-0">
      <nav className="w-full h-min absolute top-0 left-0 right-0 p-0 m-0">
        <ul
          className="h-full w-full py-3 px-2 z-50 round-lg bg-stone-700 md:grid-cols-4 lg:grid-cols-4
    grid grid-cols-2 gap-2 content-evenly"
        >
          <li className="flex justify-center items-center ">
            <button
              onClick={() => dispatch(openExpense())}
              className="underline decoration-1 underline-offset-2 decoration-stone-700 hover:decoration-stone-300 hover:underline-offset-4 transition"
            >
              Add Expenses
            </button>
          </li>
          <li className="flex justify-center items-center">
            <button
              onClick={() => dispatch(openLog())}
              className="underline decoration-1 underline-offset-2 decoration-stone-700 hover:decoration-stone-300 hover:underline-offset-4 transition"
            >
              Logged expenses
            </button>
          </li>
          <li className="flex justify-center items-center">
            <button
              onClick={() => dispatch(openEdit())}
              className="underline decoration-1 underline-offset-2 decoration-stone-700 hover:decoration-stone-100 hover:underline-offset-4 transition"
            >
              Edit expense
            </button>
          </li>
          <li className="flex justify-center items-center">
            <FaSignOutAlt className="" />
            <button
              className="underline decoration-1 underline-offset-2 decoration-stone-700 hover:underline-offset-4 hover:decoration-stone-100 transition"
              onClick={() => {
                dispatch(resetAll())
                localStorage.removeItem('user');
                redirect('/signup')
              }}
            >
              Log out
            </button>
          </li>
        </ul>
      </nav>
      {addExpense ? <ExpenseForm /> : null}
      {log ?  <ExpenseReport/> : null}
      {edit ? <EditExp /> 
      : null}
    </div>
  );
}
export default Home;
