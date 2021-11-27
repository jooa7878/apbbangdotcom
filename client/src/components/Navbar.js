import React from "react";
import { Link } from "react-router-dom";

import "../style/Navbar.scss";

function Navbar() {
  return (
    <header className="header">
      <div className="header_inner">
        <div className="inner_left">
          <Link to="/" className="link logo">
            안폰빵닷컴
          </Link>
        </div>
        <div className="inner_right">
          <Link to="/signup" className="link item">
            회원가입
          </Link>
          <Link to="/signin" className="link item">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
