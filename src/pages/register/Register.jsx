import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">ثبت نام</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>حساب کاربری</label>
        <input
          type="text"
          className="registerInput"
          placeholder="حساب کاربری"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>ایمیل</label>
        <input
          type="text"
          className="registerInput"
          placeholder="ایمیل"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>رمز عبور</label>
        <input
          type="password"
          className="registerInput"
          placeholder="رمز عبور"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          ثبت نام
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          ورود
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          مشکلی بوجود آمده!!
        </span>
      )}
    </div>
  );
}
