

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(values) {
    setApiError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("Registration successful:", data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Unexpected error occurred";
      setApiError(message);
      setLoading(false);
    }
  }

  async function login(values) {
    setApiError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log("Login successful:", data);
      localStorage.setItem("userToken", data.token);
      setLoading(false);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";
      setApiError(message);
      setLoading(false);
    }
  }

  const registerValidation = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "min is 3")
      .max(15, "max is 15"),
    email: Yup.string()
      .required("Email is Required")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z]\w{4,10}$/, "Invalid password Ex(Ahmed123)"),
    rePassword: Yup.string()
      .required("RePassword is Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is Required")
      .matches(/^01[0125][0-9]{8}$/, "We Need Egyptian Number"),
  });

  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required")
      .email("Email is invalid"),
    password: Yup.string().required("Password is Required"),
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: registerValidation,
    onSubmit: register,
  });

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidation,
    onSubmit: login,
  });

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 bg-slate-700">
      <Card className="bg-slate-900 p-5 rounded-2xl shadow-2xl w-[90%] max-w-3xl text-white">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 bg-slate-800 rounded-xl p-1">
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg text-gray-300 font-semibold transition"
              >
                Register
              </TabsTrigger>
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg text-gray-300 font-semibold transition"
              >
                Login
              </TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login">
              <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
                {apiError && (
                  <div className="bg-red-500 text-white p-3 rounded-md text-center">
                    {apiError}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                  />
                  {loginFormik.errors.email && loginFormik.touched.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {loginFormik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-300 mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                  />
                  {loginFormik.errors.password &&
                    loginFormik.touched.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {loginFormik.errors.password}
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-70"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </TabsContent>

            {/* REGISTER FORM */}
            <TabsContent value="register">
              <form onSubmit={registerFormik.handleSubmit} className="space-y-5">
                {apiError && (
                  <div className="bg-red-500 text-white p-3 rounded-md text-center">
                    {apiError}
                  </div>
                )}

                {/* Name + Phone جنب بعض */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-1">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={registerFormik.values.name}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {registerFormik.errors.name &&
                      registerFormik.touched.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerFormik.errors.name}
                        </p>
                      )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-300 mb-1">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={registerFormik.values.phone}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {registerFormik.errors.phone &&
                      registerFormik.touched.phone && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerFormik.errors.phone}
                        </p>
                      )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={registerFormik.values.email}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                  />
                  {registerFormik.errors.email &&
                    registerFormik.touched.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {registerFormik.errors.email}
                      </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-300 mb-1"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={registerFormik.values.password}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {registerFormik.errors.password &&
                      registerFormik.touched.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerFormik.errors.password}
                        </p>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="rePassword"
                      className="block text-gray-300 mb-1"
                    >
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      name="rePassword"
                      id="rePassword"
                      value={registerFormik.values.rePassword}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      className="bg-slate-800 border border-gray-600 h-12 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {registerFormik.errors.rePassword &&
                      registerFormik.touched.rePassword && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerFormik.errors.rePassword}
                        </p>
                      )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-70"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}


