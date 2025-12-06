import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../api/api";
import Mandir from './../resources/mandir.png';
import bapsLogo from './../resources/logoBaps.png';

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [loginData, setLoginData] = useState({
    sevak_id: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   setLoader(true);
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`${BACKEND_ENDPOINT}login/login`, loginData);
  //     console.log(res);
  //     if (res.data.status === true) {
  //       const { sevak } = res.data;
  //       localStorage.setItem("sevakDetails", JSON.stringify(sevak));

  //       toast.success(res.data.message);

  //       if (res.data.sevak.role !== 'Sant Nirdeshak' && res.data.sevak.role !== 'Admin') {
  //         navigate("/home");
  //       }
  //       else {
  //         navigate("/annkut-sevak-list");
  //       }
  //     } else {
  //       toast.error("Login Failed: " + res.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred: " + error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    // Static allowed users
    const staticUsers = [
      {
        sevak_id: "admin",
        password: "admin@123",
        role: "Admin",
        role_code: "Admin",
        sevak_target: 100,
        filled_form: 20,
        achieved_target: 15
      },
      {
        sevak_id: "sanchalak",
        password: "sanchalak@123",
        role: "Sanchalak",
        sevak_target: 100,
        filled_form: 20,
        achieved_target: 15
      },
      {
        sevak_id: "nirdeshak",
        password: "nirdeshak@123",
        role: "Nirdeshak",
        sevak_target: 100,
        filled_form: 20,
        achieved_target: 15
      },
      {
        sevak_id: "team1",
        password: "team1@123",
        role: "Team",
        sevak_target: 100,
        filled_form: 20,
        achieved_target: 15
      },
    ];

    // Finding matching user
    const foundUser = staticUsers.find(
      (user) =>
        user.sevak_id === loginData.sevak_id &&
        user.password === loginData.password
    );

    if (foundUser) {
      toast.success("Login Successful");

      // store in localStorage same as backend
      localStorage.setItem("sevakDetails", JSON.stringify(foundUser));

      // redirect based on role
      if (foundUser.role === "Admin") {
        navigate("/admin-home");
      } else if (foundUser.role === "Sanchalak" || foundUser.role === "Nirdeshak" || foundUser.role === "Nirikshak") {
        navigate("/leader-home");
      } else {
        navigate("/team-home");
      }
    } else {
      toast.error("Invalid Sevak ID or Password");
    }

    setLoader(false);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={Mandir} alt="Mandir Background" className="mandir-image" />
        <img src={bapsLogo} alt="BAPS Logo" className="baps-logo" />
        <h6>WELCOME</h6>
        <h2>Sampark Sevak</h2>
      </div>

      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <label>Sevak Id:</label>
          <input
            type="text"
            name="sevak_id"
            onChange={handleChange}
            value={loginData.sevak_id}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={loginData.password}
            required
          />
          <button
            type="submit"
            disabled={loader}
            className="login-btn"
          >
            {loader ? "Loading..." : "Log In"}
          </button>

          <p className="change-password-link">
            <Link to="/change-password" className="link">
              Change Password
            </Link>
          </p>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
