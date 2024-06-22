// import React from 'react'
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* <Route path="/" element={<div>Landing Page</div>} /> */}
        {/* path: "/" is for landing page */}

        {/* path: "/signup" is for signup page. "/" Is momentary */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
