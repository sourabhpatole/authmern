import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Error</h1>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default Error;
