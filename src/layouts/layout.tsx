import React, { PropsWithChildren } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="">
      <NavBar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;