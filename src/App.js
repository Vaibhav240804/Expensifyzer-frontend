import "./App.css";
import React from "react";
import Landing from "./landing";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./login";
import Register from "./Register";
import Header from "./header";
import Home from "./main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <div className="App container">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Register/>} />
          <Route exact path="/dashboard" element={<Home />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
