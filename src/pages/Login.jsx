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
    userId: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        `${BACKEND_ENDPOINT}/api/auth/login`,
        loginData
      );
      console.log("Login response: ", response);

      const userData = response.data.user;

      if (userData) {
        toast.success("Login Successful");

        localStorage.setItem("sevakDetails", JSON.stringify(userData));
        localStorage.setItem("password", loginData.password);

        const role = userData.role;

        if (role === "ADMIN") {
          navigate("/admin-home");
        } else if (role === "NIRDESHAK") {
          navigate("/nirdeshak-home");
        } else if (role === "NIRIKSHAK") {
          navigate("/nirikshak-home");
        } else if (role === "SANCHALAK") {
          navigate("/sanchalak-home");
        } else {
          navigate("/team-home");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Invalid Sevak ID or Password"
      );
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
            name="userId"
            onChange={handleChange}
            value={loginData.userId}
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
