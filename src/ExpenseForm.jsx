import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { createExpense } from "./puck/Expenses/ExpenseSlice";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { reset } from "./puck/Expenses/ExpenseSlice";

function ExpenseForm() {
  const [expense, setExpense] = useState({
    type: 'Travel',
    amount: 0,
    description: "",
  });
  const form = useSelector(state => state.dash.addExpense)
  const navigate = useNavigate();
  const {expenses,isError,isSuccess, isLoading, message} = useSelector(state => state.expenses)
  
  useEffect(
    () => {
      if(isError){
        toast.error(message)
      }
      if(isLoading && !expenses){
        toast.info('Adding...')
      }
      if(isSuccess){
        toast.info('Expense added')
      }
      dispatch(reset())
    }
  , [expenses,isError,isSuccess, isLoading, message, ])

  const dispatch = useDispatch();

  const updateinfo = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));

    setExpense((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createExpense(expense));
    setExpense({
      type: 'Travel',
      amount: 0,
      description: "",
    });
  };
  return (
    <div className="w-full h-min flex flex-col justify-evenly items-center font-serif ">
      <h1 className="text-4xl text-center font-bold text-stone-500 mt-8 mb-6 rounded-full  drop-shadow-lg">
        Add any expense
        <span className="font-bold tracking-wider hover:tracking-widest transition ">
          {" "}
          Seemlessly
        </span>
      </h1>
      <hr className="boder border-black" />
      <form
        onSubmit={onSubmitForm}
        className="text-black bg-stone-400 p-8 rounded-lg drop-shadow-2xl w-4/5"
      >
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-stone-600 text-base font-semibold"
          >
            Type
          </label>
          <select
            value={expense.type}
            name="type"
            onChange={(e) => updateinfo(e)}
            id=""
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-stone-300 focus:border-transparent"
          >
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Educational">Educational</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Internet">Internet</option>
            <option value="Hygine">Hygine</option>
            <option value="Electronics">Electronics</option>
            <option value="Rent">Rent</option>
            <option value="Bills">Bills</option>
            <option value="Medical">Medical</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Gifts">Gift</option>
            <option value="Wearables">Wearables</option>
            <option value="Savings/Investment">Savings/Investment</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-stone-600 text-base font-semibold"
          >
            Amount
          </label>
          <input
          value={expense.amount}
            type="number"
            name="amount"
            required
            id=""
            placeholder="Enter the amount of Expense in ₹"
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-stone-300 focus:border-transparent"
            onChange={(e) => updateinfo(e)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-stone-600 text-base font-semibold"
          >
            Additional description
          </label>
          <input
          value={expense.description}
            name="description"
            type="text"
            placeholder="Additional detail of expense"
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-stone-300 focus:border-transparent"
            onChange={(e) => updateinfo(e)}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-stone-400 text-stone-600 font-semibold rounded-lg shadow-lg hover:bg-stone-500 transition"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
