import React from "react";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* <h1>This is dashboard</h1> */}
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
      <h2>User Email : sourabh@gmail.com</h2>
    </div>
  );
};

export default Dashboard;
