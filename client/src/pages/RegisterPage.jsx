import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const heandleSabmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Регистрация </h1>

      <label className="text-xs text-gray-400">
        username
        <input
          type="text"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className="text-xs text-gray-400 ">
        password
        <input
          type="password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={heandleSabmit}
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4  "
        >
          Зарегистрироватся
        </button>
        <Link
          className="flex justify-center items-center text-white text-xs"
          to="/login"
        >
          Уже зарегестрирован
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
