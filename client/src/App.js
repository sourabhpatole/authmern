import Header from "./components/Header";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
          {/* <Register /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
