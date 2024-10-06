import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
// import AddNewDoctor from "./components/AddNewDoctor";
// import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";
import JobApplicationDetail from "./components/JobApplicationDetail";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
    const yy="https://backend1-96bk.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${yy}/api/v1/user/admin/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/doctor/addnew" element={<AddNewDoctor />} /> */}
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        {/* <Route path="/messages" element={<Messages />} /> */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/job-application/:reg" element={<JobApplicationDetail />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
