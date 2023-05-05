import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Register = () => {
  const [show, setShow] = useState(false);
  const [cshow, setCshow] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  console.log(inputValue);
  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const { name, password, email, cpassword } = inputValue;
    if (name === "") {
      alert("Please enter a name");
    } else if (email === "") {
      alert("Please enter a email");
    } else if (!email.includes("@")) {
      alert("enter a valid email");
    } else if (password === "") {
      alert("enter a password");
    } else if (password !== cpassword) {
      alert("Password does not match");
    } else if (cpassword === "") {
      alert("retype your password");
    } else if (password.length <= 6) {
      alert("Please enter a password with at least 6 characters");
    } else if (cpassword.length <= 6) {
      alert("Please enter a password with at least 6 characters");
    } else {
      // console.log("user registered successfully");
      // await axios.post("/register", inputValue).then((res) => console.log(res));
      // alert("register successfully");
      const data = await fetch("http://localhost:8009/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cpassword }),
      });
      const res = await data.json();
      // console.log(res.status);
      if (res.status === 201) {
        alert("User registration successfully");
        setInputValue({
          ...inputValue,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };
  return (
    <div className="register">
      <form action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={setVal}
          value={inputValue.name}
          placeholder="Enter the Name"
        />
        <label htmlFor="email">Email </label>
        <input
          type="text"
          name="email"
          onChange={setVal}
          value={inputValue.email}
          placeholder="Enter the email address"
        />
        <label htmlFor="password">Password </label>
        <input
          type={!show ? "password" : "text"}
          placeholder="Enter the password"
          name="password"
          onChange={setVal}
          value={inputValue.password}
        ></input>
        <p className="desc" onClick={() => setShow(!show)}>
          {!show ? "Show" : "Hide"}
        </p>
        <label htmlFor="cpassword">Confirm Password </label>

        <input
          type={!cshow ? "password" : "text"}
          placeholder="Re-Enter the password"
          name="cpassword"
          onChange={setVal}
          value={inputValue.cpassword}
        ></input>
        <p className="desc" onClick={() => setCshow(!cshow)}>
          {!cshow ? "Show" : "Hide"}
        </p>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <span>
          If already user click &nbsp;
          <NavLink to="/">Log in</NavLink>
        </span>
      </form>
    </div>
  );
};

export default Register;
