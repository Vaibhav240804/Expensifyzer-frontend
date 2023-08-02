import React, { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getTemplate, reset, resetAll } from "./puck/report/reportSlice";
import { useDispatch } from "react-redux";
import html2pdf from "html2pdf.js"; // Import the html2pdf library
import { toast } from "react-toastify";
import { getExpenses, wipeWeekly } from "./puck/Expenses/ExpenseSlice";

let count = 0;

const ExpenseReport = () => {
  const [month, setMonth] = useState(0);
  const [buttonDis, setbuttoDis] = useState(true);
  const staeExpenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const { log } = useSelector((state) => state.dash);
  const { template, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.report
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isLoading) {
      toast.info("loading report...", { closeDuration: 1000 });
    } else if (isSuccess) {
      toast.info("Report loaded");
      setbuttoDis(false);
    }
    return () => {
      const parent = document.getElementById("weely-container");
      const child = document.getElementById("weekly-report-inner");
      if (child) {
        parent.removeChild(child);
      }
      dispatch(wipeWeekly());
    };
  }, [log, isSuccess, isError, isLoading, message]);

  const Data = useSelector((state) => state.expenses.weeklyExp);
  const dataloading = useSelector((state) => state.expenses.isLoading);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(getTemplate(parseInt(month)));
  };

  useEffect(() => {
    if (log && Data) {
      const { expenses, dates } = Data;
      appendData(expenses, dates);
    } else if (!Data) {
      dispatch(getExpenses());
    }
  }, [staeExpenses, log, Data]);

  const appendData = (expenses, dates) => {
    const parentContainer = document.getElementById("weely-container");
    const child = document.getElementById("weekly-report-inner");
    if (child) {
      parentContainer.removeChild(child);
    }
    const container = document.createElement("div");
    container.id = "weekly-report-inner";
    container.classList.add(
      "w-full",
      "flex",
      "flex-col",
      "items-center",
      "text-gray-800",
      "text-xl",
      "font-semibold"
    );
    parentContainer.appendChild(container);
    let i = 0;
    expenses.map((expense, index) => {
      const firstdate = dates[i].date;
      if (expense.date !== firstdate) {
        const datesmana = document.createElement("small");
        const total = document.createElement("small");
        const lowdiv = document.createElement("div");

        datesmana.textContent = "Total : ";
        total.textContent = `₹${dates[i].totalAmount}`;
        lowdiv.appendChild(datesmana);
        lowdiv.appendChild(total);
        lowdiv.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "font-bold",
          "w-full",
          "h-20",
          "bg-stone-300",
          "rounded-lg",
          "shadow-lg",
          "my-2",
          "p-2"
        );
        container.appendChild(lowdiv);
        i++;
      }

      const outerdiv = document.createElement("div");
      const upperinnerdiv = document.createElement("div");
      const lowerinnerdiv = document.createElement("div");
      const datesm = document.createElement("small");
      const typesm = document.createElement("small");
      const descsm = document.createElement("small");
      const costsm = document.createElement("small");
      descsm.classList.add("max-w-[48%]", "max-h-[28px]");
      costsm.classList.add(
        "underline",
        "underline-offset-4",
        "decoration-2",
        "decoration-stone-700"
      );
      datesm.textContent = expense.date;
      typesm.textContent = expense.type;
      descsm.textContent = expense.description;
      costsm.textContent = `₹${expense.amount}`;
      upperinnerdiv.appendChild(datesm);
      upperinnerdiv.appendChild(typesm);
      lowerinnerdiv.appendChild(descsm);
      lowerinnerdiv.appendChild(costsm);
      typesm.classList.add("text-cyan-100");
      upperinnerdiv.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "italic"
      );
      lowerinnerdiv.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "overflow-auto"
      );
      outerdiv.appendChild(upperinnerdiv);
      outerdiv.appendChild(lowerinnerdiv);
      outerdiv.classList.add(
        "w-full",
        "h-20",
        "bg-stone-400",
        "rounded-lg",
        "shadow-lg",
        "my-2",
        "p-2",
        "flex",
        "flex-col",
        "boder",
        "border-2",
        "border-stone-100",
        "justify-between",
        "hover:border-stone-300"
      );
      container.appendChild(outerdiv);
      if (expenses.length - 1 === index) {
        const datesmana = document.createElement("small");
        const total = document.createElement("small");
        const lowdiv = document.createElement("div");

        datesmana.textContent = "Total : ";
        total.textContent = dates[i].totalAmount;
        lowdiv.appendChild(datesmana);
        lowdiv.appendChild(total);
        lowdiv.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "font-bold",
          "w-full",
          "h-20",
          "bg-stone-300",
          "rounded-lg",
          "shadow-lg",
          "my-2",
          "p-2"
        );
        container.appendChild(lowdiv);
        i++;
      }
      count++;
    });
  };

  const handleDisplayInNewWindow = () => {
    if (template) {
      const newWindow = window.open("report", "_blank");
      if (newWindow) {
        newWindow.document.write(template);
      } else {
        toast.error("Failed to open new window. Please allow pop-ups.");
      }
      newWindow.document.close();
    }
  };
  const handleDownloadPdf = () => {
    if (template) {
      const element = document.createElement("div");
      element.innerHTML = template;
      const options = {
        margin: 10,
        filename: "expense_report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Use html2pdf to convert the HTML content to a PDF and initiate the download
      html2pdf().from(element).set(options).save();
    }
  };

  return (
    <div className="w-5/6 m-32 min-h-full p-0 text-lg text-center flex flex-col items-center justify-evenly text-stone-700">
      <form onSubmit={handleFormSubmit}>
        <label>
          Select a month:
          <select
            className="w-4/6 py-2 px-4 bg-stone-300 text-stone-600 font-semibold rounded-lg shadow-lg"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
            {/* Add more options for other months */}
          </select>
        </label>
        <button
          className="w-full mt-4 py-2 px-4 bg-stone-400 text-stone-600 font-semibold rounded-lg shadow-lg hover:bg-stone-300 transition"
          type="submit"
        >
          Fetch report
        </button>
      </form>
      {template ? (
        <div className="w-full p-4 text-blackrounded-lg drop-shadow-2xl">
          <button
            disabled={buttonDis}
            className="w-full mt-4 py-2 px-4 bg-stone-300 text-stone-600 font-semibold rounded-lg shadow-lg hover:bg-stone-400 transition"
            onClick={handleDisplayInNewWindow}
          >
            Display in New Window
          </button>
          <button
            disabled={buttonDis}
            className="w-full mt-4 py-2 px-4 bg-stone-400 text-stone-600 font-semibold rounded-lg shadow-lg hover:bg-stone-500 transition"
            onClick={handleDownloadPdf}
          >
            Download PDF
          </button>
        </div>
      ) : null}
      <div
        id="weely-container"
        className="min-h-screen w-full flex flex-col items-center my-10"
      ></div>
      <footer className="">
        If Expense list of this week doesn't appear then refresh the page
      </footer>
    </div>
  );
};

export default ExpenseReport;
