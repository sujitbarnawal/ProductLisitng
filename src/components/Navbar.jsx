import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">

        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-semibold cursor-pointer">
          ProductList
        </h1>

        {/* Nav Options */}
        <div className="flex gap-4 sm:gap-8 text-sm sm:text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer hover:text-blue-600 transition ${
                isActive ? "border-b-2 border-blue-600 pb-1" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `cursor-pointer hover:text-blue-600 transition ${
                isActive ? "border-b-2 border-blue-600 pb-1" : ""
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `cursor-pointer hover:text-blue-600 transition ${
                isActive ? "border-b-2 border-blue-600 pb-1" : ""
              }`
            }
          >
            Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
