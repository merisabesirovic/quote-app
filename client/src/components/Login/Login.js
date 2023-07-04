import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import "./Login.css";
import image from "../../assets/quill-pen.png";
import "../../fonts/fonts.css";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [loginSuccess, setLoginSuccess] = useState("");
  const { token, setToken } = useContext(AppContext);
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { userName, password } = values;
      const requestBody = {
        username: userName,
        password: password,
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/sessions",
          requestBody
        );
        const { accessToken } = response.data;

        const res = await axios.get("http://localhost:8000/quotes", {
          headers: { Authorization: "Bearer " + accessToken },
        });
        localStorage.setItem("token", res.token);
        setToken(res.token);

        navigation("/");

        console.log(res);
      } catch (error) {
        console.log(error);
        setLoginSuccess("Invalid credentials");
      }
    },
  });

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="flex items-center justify-center h-screen gradient-background"
    >
      <div className="flex  gap-20 bg-gray-100 bg-opacity-50 p-6 rounded-lg shadow-lg">
        <form
          className="h-80 flex flex-col justify-center items-center gap-3"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome back</h1>
          <p className="text-xs font-bold text-emerald-950">
            Fuel your motivation with the quote app's collection of powerful
            quotes.
          </p>
          <label className="block" htmlFor="userName"></label>
          <input
            id="userName"
            name="userName"
            type="text"
            required
            className="mt-1 w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            placeholder="enter your username"
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
          <label className="block" htmlFor="password"></label>
          <input
            id="password"
            required
            name="password"
            type="password"
            className="mt-1 w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            className="w-80 h-10 p-1.5 mt-1 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-lg
             hoverbg-emerald-900 active:bg-emerald-600 focus:outline-none focus:ring focus:ring-violet-300"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
          {loginSuccess && <p className="text-red-500 mt-4">{loginSuccess}</p>}
        </form>
        <div className="flex items-center">
          <img className="w-48 h-auto" src={image} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Form;
