import React from "react";

import "../style/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Aiden Ahn All Rights Reserved.
    </footer>
  );
}

export default Footer;
