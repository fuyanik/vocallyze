import "./footer.css";
import {Link} from 'react-router-dom';
import { useState } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import payment_logo from "./images/payment.jpeg";

import { RiFacebookFill } from "react-icons/ri";
import {AiOutlineInstagram} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs";
import {RiLinkedinFill} from "react-icons/ri";
import gV from "../../gV";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
const Footer = ({marginTop}) => { 

  
    const [isHover , setIsHover] = useState(false);

  return (
    <div style={{ marginTop: marginTop }} className="footer ">
      <div className="footer-main">
        <div className="footer-main-left relative">
          <img src="https://vitamu.imgix.net/Group%201%20(3).png?auto=undefined%2Ccompress" className="footer-main-left__vitamu-logo" />
          <p className="footer-main-left__title">
            Terms of Service · Privacy Policy
          </p>

          <div className="footer-main-left__social-logos">
            <a href="https://www.facebook.com/vitamucom" target="_blank">
              {" "}
              <RiFacebookFill className="footer-main-left__social-logos__logo" />{" "}
            </a>
            <a href="https://www.instagram.com/vitamucom/" target="_blank">
              {" "}
              <AiOutlineInstagram className="footer-main-left__social-logos__logo" />{" "}
            </a>
            <a href="https://twitter.com/vitamucom" target="_blank">
              {" "}
              <BsTwitter className="footer-main-left__social-logos__logo" />{" "}
            </a>
            <a href="https://www.linkedin.com/company/vitamu/" target="_blank">
              {" "}
              <RiLinkedinFill className="footer-main-left__social-logos__logo" />{" "}
            </a>
          </div>

         

          <PrimaryButton
            width={"230px"}
          />

          <p className="footer-main-left__text">
            These statements have not been evaluated by the FDA or NHS. This
            service is not intended to treat or cure any disease
          </p>
          <img src={payment_logo} className="footer-main-left__payment-logo" />
          <p className="footer-main-left__text">
            Vitamu© 2023 All Rights Reserved
          </p>
        </div>

        <div className="footer-main-right">
          <ul>
            <p className="footer-main-rgiht-header">Services</p>
            <Link className="style-none" to="/mri">
              <li>MRI</li>
            </Link>
            <Link to="/mammogram">
              {" "}
              <li>Mammogram</li>{" "}
            </Link>
            <Link to="/ultrasound">
              {" "}
              <li>Ultrasound</li>{" "}
            </Link>
            <Link to="/ct">
              {" "}
              <li>CT Scan</li>{" "}
            </Link>
            <Link to="/x-ray">
              {" "}
              <li>X-Ray</li>{" "}
            </Link>
            <Link to="/full-body">
              {" "}
              <li>Full Body Scan</li>{" "}
            </Link>
            <Link to="/pregnancy">
              {" "}
              <li>Pregnancy</li>{" "}
            </Link>
          </ul>

          <ul>
            <p className="footer-main-rgiht-header">About </p>
            <Link to="/how-works">
              {" "}
              <li>How It Works</li>{" "}
            </Link>
            <Link to="/why-second-opinion">
              {" "}
              <li>Why Second Opinion</li>{" "}
            </Link>
            <Link className="hidden" to="/radiology-team">
              {" "}
              <li>Radiology Team</li>{" "}
            </Link>
            <Link to="/journey-mammogram">
              {" "}
              <li>Sample Reports</li>{" "}
            </Link>
            <Link to="/contact">
              {" "}
              <li>Help</li>{" "}
            </Link>
            <Link to="/what-next">
              {" "}
              <li>FAQ</li>{" "}
            </Link>
          </ul>

         
        
        </div>
      </div>
    </div>
  );


}








export default Footer;