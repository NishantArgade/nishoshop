import React from "react";
import "./Footer.css";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";

const Footer = () => {
  return (
    <div id="Footer">
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS mobile phone</p>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="playstore" />
        </div>

        <div className="midFooter">
          <h1>NishoShop</h1>
          <p>High Quality is our first priority</p>
          <p>Copyrights 2022 &copy; NishantArgade</p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/nishant.argade/">Instagram</a>
          <a href="/https://www.linkedin.com/in/nishant-argade-9058ab1a5/">Linkedin</a>
          <a href="https://www.facebook.com/nishant.argade.14">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
