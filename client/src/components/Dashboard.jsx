import React, { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import SendMessages from "../pages/SendMessages";
import SendImage from "../pages/SendImage";
import SendTemplate from "../pages/SendTemplate";
import LoginHistoy from "./LoginHistoy";

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
    <div>
      <div
        className="topContent"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <img
          src="./profilePic.png"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
          alt=""
        />
        <div className="leftSide">
          <h4>User Email : {loginData.email}</h4>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div
        className="pagesImport"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <SendTemplate />
        <LoginHistoy />
        {/* <SendMessages />
        <SendImage /> */}
      </div>
    </div>
  );
};

export default Dashboard;
