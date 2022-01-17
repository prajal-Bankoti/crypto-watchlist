import { Routes, Route } from "react-router-dom";
import { Stoks } from "../components/stock";
import Login from "../components/Login";
export const RoutePage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/home" element={<Stoks />}></Route>
    </Routes>
  );
};
