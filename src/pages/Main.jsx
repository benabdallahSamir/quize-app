import React from "react";
import { Outlet } from "react-router-dom";
import AsideBar from "./components/AsideBar";
import ListItem from "./components/ListItem";
import { Home, Pen } from "lucide-react";

function Main() {
  return (
    <div className="w-screen min-h-screen flex">
      <AsideBar>
        <ListItem path={"/"}>
          <Home className="mr-5" size={24} />
          <p className="capitalize">home</p>
        </ListItem>
        <ListItem path={"/new"}>
          <Pen className="mr-5" size={24} />
          <p className="capitalize">generate quezz</p>
        </ListItem>
      </AsideBar>
      <Outlet />
    </div>
  );
}

export default Main;
