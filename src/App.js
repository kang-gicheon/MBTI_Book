import { Route, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./pages/Detail"; // 상세페이지
import Home from "./pages/Home"; // 메인 페이지
import Login from "./pages/Login"; // 로그인 페이지
import Register from "./pages/Register"; // 회원가입 페이지

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
