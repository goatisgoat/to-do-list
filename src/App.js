import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="container-app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
