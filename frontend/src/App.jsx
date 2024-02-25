import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/api/user/register" element={<UserRegister />} />
        <Route path="/books/create" element={<CreateBooks />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  
  );
};

export default App;
