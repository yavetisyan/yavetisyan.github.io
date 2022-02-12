//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "@mui/material";
import React from "react";
import "../../App.css";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="/home">
        AYL SHOP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Footer() {
  return (
    <>
      <footer className="footer_section">
        <div className="rounded-social-buttons">
          <a
            className="social-button facebook"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className="social-button twitter"
            href="https://www.twitter.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className="social-button linkedin"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            className="social-button github"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            className="social-button instagram"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <Copyright />
      </footer>
    </>
  );
}
export default Footer;
