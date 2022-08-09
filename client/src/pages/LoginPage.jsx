import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkAuth, loginUser } from "../redux/features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkAuth);
  const { status } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const heandleSabmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Авторизация</h1>

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
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4"
          onClick={heandleSabmit}
        >
          Войти
        </button>
        <Link
          className="flex justify-center items-center text-white text-xs"
          to="/register"
        >
          Нет акаунта
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
