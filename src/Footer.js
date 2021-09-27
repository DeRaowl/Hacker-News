import React from "react";
import { FaTwitter, FaGithub, FaGlobeAfrica } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <hr />
      <div className="footer">
        <p>
          &copy; 2021, Made by <span className="author">Rahul M</span>
        </p>
        <div className="link-container">
          <a href="https://twitter.com/DeRaowl">
            <FaTwitter />
          </a>
          <a href="https://github.com/DeRaowl">
            <FaGithub />
          </a>
          <a href="http://rahulreddy.tech/">
            <FaGlobeAfrica />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
