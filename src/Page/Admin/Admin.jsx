import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/AdminComponent/Sidebar";
import Header from "../../Components/AdminComponent/Header";

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("authToken")){
        navigate("/login")
    }
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Admin;
