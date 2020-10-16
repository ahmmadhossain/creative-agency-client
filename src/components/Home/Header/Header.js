import React from "react";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <NavbarMenu />
      <HeaderBanner />
    </div>
  );
};

export default Header;
