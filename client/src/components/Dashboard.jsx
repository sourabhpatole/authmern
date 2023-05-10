import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = () => {
  const [loginData, setLoginData] = useContext(LoginContext);

  // console.log(loginData.validUserOne);
  const navigate = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("userdatatoken");
    // console.log(token);
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log(data.validUserOne);

    if (data.status === 401 || !data) {
      // console.log("Error page redirect");
      navigate("*");
    } else {
      // console.log("User verify");
      setLoginData(data.validUserOne);
      // console.log(data.validUserOne.name);
      navigate("/dash");
    }
  };
  useEffect(() => {
    DashboardValid();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userdatatoken");
    navigate("/");
    setLoginData("");
  };
  console.log(loginData.name);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h1>This is dashboard</h1>
      <img
        src="./profilePic.png"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          padding: "10px 20px",
        }}
        alt=""
      />
      <button onClick={handleLogout}>Logout</button>
      <h4>User Email : {loginData.email}</h4>
    </div>
  );
};

export default Dashboard;
