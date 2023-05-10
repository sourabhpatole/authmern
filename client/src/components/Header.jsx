import { useContext } from "react";
import { LoginContext } from "./ContextProvider/Context";
import "./header.css";
const Header = () => {
  const [loginData, setLoginData] = useContext(LoginContext);
  // console.log(loginData.validUserOne.name);
  return (
    <div className="header">
      <h1>........</h1>
      <div className="avatar">
        <h3>
          <span>{loginData.name}</span>
          {console.log(loginData)}
        </h3>
      </div>
    </div>
  );
};

export default Header;
