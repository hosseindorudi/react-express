import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">ورود</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>حساب کاربری</label>
        <input
          type="text"
          className="loginInput"
          placeholder="حساب کاربری"
          ref={userRef}
        />
        <label>رمز عبور</label>
        <input
          type="password"
          className="loginInput"
          placeholder="رمز عبور"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          ورود
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          ثبت نام
        </Link>
      </button>
    </div>
  );
}
