import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import "./index.css"
import { MdNavigateBefore } from "react-icons/md";
import Navbar from "./Components/MainSiteComponent/Navbar";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
