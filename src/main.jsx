import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./Page/LoginPage.jsx";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./Components/ProfilePage";
import Dashboard from "./Page/Dashboard.jsx";
import Otp from "./Page/OTP.jsx";
// import Dashboard from "./Page/Dashboard.jsx";
import MapPage from "./Page/MapPage.jsx";
import DisasterReportForm from "./Page/DisasterReportForm.jsx";
import AdminFetchReportPage from "./Page/Admin/AdminFetchReportPage.jsx";
import AdminDashboard from "./Page/Admin/AdminDashboard.jsx";
import Incident from "./Page/Admin/Incident.jsx"
import Admin from "./Page/Admin/Admin.jsx";
import RootLayout from "./MainSite/RootLayout.jsx";
import User from "./Page/User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <RootLayout />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/form1",
        element: <DisasterReportForm />,
      },
      {
        path: "/adminpage",
        element: <MapPage />,
      },
    ],
  }, //Admin Router Begin
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "adminDashboard", // No leading '/' for nested routes
        element: <AdminDashboard />,
      },
      {
        path: "fetchReport", // No leading '/'
        element: <AdminFetchReportPage />,
      },
      {
        path: "incident", // No leading '/'
        element: <Incident />,
      },
    ]
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "form1",
        element: <DisasterReportForm />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/OTP",
    element: <Otp />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
