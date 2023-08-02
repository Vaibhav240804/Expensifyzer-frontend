import { useSelector } from "react-redux/es/hooks/useSelector";
import { updateExp, reset, deleteExp } from "./puck/Expenses/ExpenseSlice";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditExp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.expenses
  );

  useEffect(()=>{
    if(!user){
      navigate('/');
    }
    if (expenses) {
      console.log(expenses);
      appendData(expenses);
    }
  },[expenses])

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (isError) {
      console.log(message);
      toast.error(message);
    } else if (isLoading) {
      toast.info("Loading expenses...");
    } 
    else if(isSuccess){
      toast.info('Expenses loaded')
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, expenses]);

  const optionsData = [
    { value: "Food", text: "Food" },
    { value: "Educational", text: "Educational" },
    { value: "Cosmetics", text: "Cosmetics" },
    { value: "Internet", text: "Internet" },
    { value: "Hygine", text: "Hygine" },
    { value: "Electronics", text: "Electronics" },
    { value: "Rent", text: "Rent" },
    { value: "Bills", text: "Bills" },
    { value: "Medical", text: "Medical" },
    { value: "Entertainment", text: "Entertainment" },
    { value: "Gifts", text: "Gifts" },
    { value: "Wearables", text: "Wearables" },
    { value: "Savings/Investment", text: "Savings/Investment" },
    { value: "Grocery", text: "Grocery" },
    { value: "Travel", text: "Travel" },
  ];

  const appendData = (expenses) => {
    const parentContainer = document.getElementById("edit-exp-container");
    const child = document.getElementById("edit-exp-inner");
    if (child) {
      parentContainer.removeChild(child);
    }
    const container = document.createElement("div");
    container.id = "edit-exp-inner";
    container.classList.add("w-full", "flex", "flex-col");
    parentContainer.appendChild(container);
    expenses.map((expense, index) => {
      const expenseContainer = document.createElement("div");
      expenseContainer.classList.add(
        "w-full",
        "flex",
        "flex-col",
        "border",
        "border-stone-700",
        "rounded-lg",
        "p-2"
        );
        const upperinnerdiv = document.createElement("div");
        const middleinnerdiv = document.createElement("div");
        const lowerinnerdiv = document.createElement("div");

      const type = document.createElement("select");
      type.name = "type";
      optionsData.forEach((optionData) => {
        const optionElement = document.createElement("option");
        optionElement.value = optionData.value;
        optionElement.text = optionData.text;
        type.appendChild(optionElement);
      });

      type.value = expense.type;
      
      type.onchange = (e) => {
        console.log(e.target.value);
        type.value = e.target.value;
      };
      
      lowerinnerdiv.classList.add(
        "w-full",
        "flex",
        "justify-between",
        "items-center"
        );
        const amount = document.createElement("input");
        const description = document.createElement("input");
        const date = document.createElement("small");
        const update = document.createElement("button");
        const remove = document.createElement("button");
        amount.classList.add(
          "w-2/5",
          "h-10",
          "rounded-lg",
          "border",
          "border-stone-700",
          "p-2"
        );
        description.classList.add(
          "max-w-fit",
          "h-10",
          "rounded-lg",
          "border",
          "border-stone-700",
          "p-2",
        )
        type.classList.add(
          "w-2/5",
          "h-10",
          "rounded-lg",
          "border",
          "border-stone-700",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-stone-700",
          "focus:border-transparent",
          "text-center"
        )
        amount.type = "number";
        amount.name = "amount";
        description.name = "description";
        description.type = "text";
        description.value = expense.description;
        date.textContent = expense.date;
        update.textContent = "click to update/delete";
        remove.textContent = "Delete";
        type.disabled = true;
        amount.disabled = true;
        remove.disabled = true;
        amount.value = expense.amount;
        date.textContent = (expense.createdAt).split('T')[0];
        description.disabled = true;
        update.classList.add(
        "bg-stone-500",
        "rounded-lg",
        "p-2",
        "text-stone-100",
        "hover:bg-stone-300",
        "transition"
      );
      remove.classList.add(
        "bg-stone-300",
        "rounded-lg",
        "p-2",
        "text-stone-100",
        "hover:bg-stone-300",
        "transition",
        "border","border-stone-100"
      );
      update.addEventListener("click", () => {
        remove.classList.remove("bg-stone-300")
        remove.classList.add("bg-stone-600")
        remove.disabled = false;
        type.disabled = false;
        amount.disabled = false;
        description.disabled = false;
        update.textContent = "Save";
        update.classList.remove("bg-stone-500", "hover:bg-stone-300");
        update.classList.add("bg-stone-400", "hover:bg-stone-500","border","border-stone-100");

        update.addEventListener("click", () => {
          const newExpense = {
            id: expense._id,
            type: type.value,
            amount: amount.value,
            description: description.value,
          };
          dispatch(updateExp(newExpense));
        });
      });
      remove.addEventListener("click", () => {
        const exp_id = expense._id;
        expenseContainer.classList.add("translate-x-full","transition","duration-700")
        dispatch(deleteExp(exp_id))
      });
      upperinnerdiv.classList.add("w-full", "flex", "justify-between","items-center","py-2");
      middleinnerdiv.classList.add("w-full", "flex", "justify-between","items-center");
      lowerinnerdiv.classList.add("w-full", "flex", "justify-between","items-center","py-2");

      upperinnerdiv.appendChild(type);
      upperinnerdiv.appendChild(amount);
      middleinnerdiv.appendChild(description);
      middleinnerdiv.appendChild(date);
      lowerinnerdiv.appendChild(update);
      lowerinnerdiv.appendChild(remove);
      expenseContainer.appendChild(upperinnerdiv);
      expenseContainer.appendChild(middleinnerdiv);
      expenseContainer.appendChild(lowerinnerdiv);
      expenseContainer.classList.add("w-full", "flex", "flex-col", "my-2","bg-stone-400","rounded-lg","shadow-2xl","p-2","border","border-stone-100")
      container.appendChild(expenseContainer);
    });
  };

  return (<>
    <div
      id="edit-exp-container"
      className="min-h-fit w-5/6 flex flex-col items-center my-32 text-black"
    ></div>
    <footer className="w-5/6 text-black font-serif my-2">Recently added expenses will be displayed here, once you close this window they will disappear from here</footer>
    </>
  );
}

export default EditExp;
