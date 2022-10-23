import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import EditContainer from "../pages/profile/EditContainer";
import Profile from "../pages/profile/Profile";

export default function Router(props) {
  return (
    <Routes>
      <Route path="/" element={<Home user={props.user} />} />
      <Route path="/perfil" element={<Profile user={props.user} />} />
      <Route
        path="/editarperfil"
        element={<EditContainer user={props.user} />}
      />
    </Routes>
  );
}
