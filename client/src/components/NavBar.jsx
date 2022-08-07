import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const isAuth = true;

  const activeStyles = {
    color: "white",
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        E
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to={"/"}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              to={"/posts"}
            >
              Мои Посты
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              to={"/new"}
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? <button>SignUp</button> : <Link to={"/login"}>Login</Link>}
      </div>
    </div>
  );
}
