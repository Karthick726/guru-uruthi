import React from "react";
import "./Footer.css";
import logo from "../../../../assets/Images/logo.png";
const Footer = () => {
  return (
    <footer>
      <div className="container con">
        <div className="footerTop">
          <div className="footerCard">
            <div className="aboutLogo">
              <img src={logo} alt width={100} height={100} />
            </div>
            <p>
              Guru Uruthi specializes in crafting premium quality traditional
              snacks with a healthy twist. Our flagship products — Moringa
              Mittai and Karuppu Kavuni Mittai — bring together authentic taste,
              natural ingredients, and the promise of wellness.
            </p>
            <div className="social">
              <a href="#">
                <i className="bi bi-facebook" />
              </a>
           
              <a href="#">
                <i className="bi bi-instagram" />
              </a>
              <a href="#">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
          <div className="footerCard">
            <h3 className="footerHead">Useful Links</h3>
            <div className="linksOne">
              <a href>
                <i className="bi bi-arrow-right-short" />
                About Us
              </a>
              <a href>
                <i className="bi bi-arrow-right-short" />
                Products
              </a>
              <a href>
                <i className="bi bi-arrow-right-short" />
                Health Benefits
              </a>
              <a href>
                <i className="bi bi-arrow-right-short" />
                Testimonial
              </a>
              <a href>
                <i className="bi bi-arrow-right-short" />
                Contact
              </a>
            </div>
          </div>
          <div className="footerCard">
            <h3 className="footerHead">UseFul Links</h3>
            <div className="linksTwo">
              <a href>
                <i className="bi bi-arrow-right-short" />
                Term & condition
              </a>
              <a href>
                <i className="bi bi-arrow-right-short" />
               Privacy policy
              </a>
            
            </div>
          </div>
          <div className="footerCard">
            <h3 className="footerHead">Contact Us</h3>
            <div className="linksThree">
              <h4>Address Location</h4>
              <p>
                <i className="bi bi-geo-alt-fill" />
                <span>Orlando City, USA</span>
              </p>
              <h4>Phone Number</h4>
              <p>
                <i className="bi bi-telephone-fill" />
                <span>+1 952-435-7106</span>
              </p>
              <h4>Email address</h4>
              <p>
                <i className="bi bi-envelope-fill" />
                <span>info@solak.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="container con">
          <div className="copyRights">
            <p>
              Copyright <i className="bi bi-c-circle" /> 2025{" "}
              <a href="/">Guru Uruthi</a>. All Rights Reserved.
            </p>
            <p>
             Designed By : <a href="https://hellowtec.com/" target="_blank" style={{
                color:"#FE1246",
                textDecoration:"underline"
              }}>Hello Technologies.</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
