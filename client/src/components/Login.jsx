import { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  // console.log(inputVal);

  const setVal = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputVal;
    // console.log(e);
    if (!email.includes("@")) {
      alert("Please enter your valid email");
    } else if (email === "") {
      alert("Please enter email");
    } else if (password === "") {
      alert("Please enter password");
    } else if (password <= 6) {
      alert("Password must be at least 6 characters");
    } else {
      // console.log("Login successful");

      const data = await fetch("http://localhost:8009/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const res = await data.json();
      console.log(res.result.userValid.name);
      if (res.status === 201) {
        localStorage.setItem("userdatatoken", res.result.token);
        console.log(res.result.token);
        navigate("/dash");
        setInputVal({ ...inputVal, email: "", password: "" });
      }
    }
  };

  return (
    <div className="register">
      <form action="">
        <label htmlFor="">Email </label>
        <input
          type="text"
          onChange={setVal}
          name="email"
          value={inputVal.email}
          placeholder="Enter the email address"
        />
        <label htmlFor="">Password </label>

        <input
          type={!show ? "password" : "text"}
          placeholder="Enter the password"
          onChange={setVal}
          value={inputVal.password}
          name="password"
        ></input>

        <p className="desc" onClick={() => setShow(!show)}>
          {!show ? "Show" : "Hide"}
        </p>
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
        <span>
          Need to create account &nbsp;
          {/* <Link to="/register">
            <button className="login">Sign up</button>
          </Link> */}
          <NavLink to="/register">Sign Up</NavLink>
        </span>
      </form>
    </div>
  );
};

export default Login;
