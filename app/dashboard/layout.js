"use client";
import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  // console.log(menu);
  return (
    <div>
      <div
        className={`md:w-64 z-50 h-screen fixed bg-white ${
          menu ? "block" : "hidden"
        } ${menu ? "md:block" : "hidden md:block"}`}
      >
        <Sidebar setMenu={setMenu} />
      </div>

      <div className="md:ml-64">
        <Header setMenu={setMenu} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
