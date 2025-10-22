

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // حالة المينيو

  useEffect(() => {
    try {
      const saved = localStorage.getItem("userProfile");
      if (saved) {
        const profile = JSON.parse(saved);
        if (profile.avatarDataUrl) {
          setAvatar(profile.avatarDataUrl);
        }
      }
    } catch (e) {
      console.error("Error loading profile:", e);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-800 z-50">
      <div className="flex justify-between items-center w-full px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Cartyx
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
                : "text-white hover:text-blue-600 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
                : "text-white hover:text-blue-600 transition"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/category"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
                : "text-white hover:text-blue-600 transition"
            }
          >
            Category
          </NavLink>

          <NavLink
            to="/about"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
                : "text-white hover:text-blue-600 transition"
            }
          >
            About
          </NavLink>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex w-48 justify-around items-center">
          <Link to="/cart" className="relative top-0">
            <ShoppingCart className="w-6 h-6 text-white hover:text-blue-600" />
          </Link>

          <Link to="/profile">
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="inline-block size-8 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10 object-cover"
              />
            ) : (
              <div className="inline-flex items-center justify-center size-8 rounded-full bg-gray-700 text-gray-300 ring-2 ring-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                  />
                </svg>
              </div>
            )}
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 w-20 text-center rounded py-1 text-white"
          >
            Register
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center space-x-4">
          <Link to="/cart">
            <ShoppingCart className="w-6 h-6 text-white hover:text-blue-600" />
          </Link>

          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-600 px-6 py-4 space-y-3 border-t border-slate-700">
          <NavLink to="/" className="block text-white hover:text-blue-600">
            Home
          </NavLink>
          <NavLink to="/products" className="block text-white hover:text-blue-600">
            Products
          </NavLink>
          <NavLink to="/category" className="block text-white hover:text-blue-600">
            Category
          </NavLink>
          <NavLink to="/about" className="block text-white hover:text-blue-600">
            About
          </NavLink>
          <NavLink to="/profile" className="block text-white hover:text-blue-600">
            Profile
          </NavLink>
          <NavLink to="/register" className="block text-white hover:text-blue-600">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}
