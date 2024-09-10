import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header"
import Sidebar from "../Components/Sidebar";
const User = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            navigate("/login")
        }
      }, []);
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default User