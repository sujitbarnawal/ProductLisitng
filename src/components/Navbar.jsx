import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-semibold cursor-pointer">ProductList</h1>

        <div className="flex gap-8 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer hover:text-blue-600 ${
                isActive ? "border-b-2 border-blue-600" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `cursor-pointer hover:text-blue-600 ${
                isActive ? "border-b-2 border-blue-600" : ""
              }`
            }
          >
            Products
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
