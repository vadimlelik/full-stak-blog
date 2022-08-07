import React from "react";
import NavBar from "./NavBar";

export default function Layuot({ children }) {
  return (
    <div className="className='container mx-auto">
      <NavBar /> {children}
    </div>
  );
}
