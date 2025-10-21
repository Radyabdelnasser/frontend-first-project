import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg mb-6">الصفحة اللي بتدور عليها مش موجودة 😕</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        ارجع للصفحة الرئيسية
      </Link>
    </div>
  );
}
