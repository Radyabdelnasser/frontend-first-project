import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
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
      // ✅ بعد التسجيل الناجح، نروح مباشرة لصفحة الـ Login
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Unexpected error occurred";
      setApiError(message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <div className="min-h-screen flex items-center mt-8 justify-center bg-gray-700">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-200 p-8 rounded-2xl shadow-xl w-[70%] max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create New Account
        </h2>

        {apiError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
            {apiError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full h-10 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="rePassword" className="block text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full h-10 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-70"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
