import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplatePage from "./TemplatePage";
import LoginPage from "./LoginPage";
import HeaderPage from "./HeaderPage";
import React from "react";

const RoutingComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderPage />
        <Routes>
          <Route path="/template" element={<TemplatePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/header" element={<HeaderPage />}></Route>
          <Route path="/" element={<HeaderPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default RoutingComponent;
