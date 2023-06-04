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
          <img src="https://vitamu.imgix.net/vitamuLogo.png?auto=undefined%2Ccompress" className="footer-main-left__vitamu-logo" />
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

          {
            isHover &&
            <BiRadsDropdown
              onMouseLeave={() => setIsHover(false)}
              top={gV.mq.matches ? "50%" : "29%"}
              left={gV.mq.matches ? "02%" : "-1%"}
            />
          }

          <PrimaryButton
            width={"230px"}
            onMouse={() => setIsHover(true)}
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
            <p className="footer-main-rgiht-header">Facts</p>
            <Link className="style-none" to="/human-error">
              <li>Human Error</li>
            </Link>
            <Link to="/missed-diagnosis">
              {" "}
              <li>Missed Diagnosis</li>{" "}
            </Link>
            <Link to="/early-detection">
              {" "}
              <li>Early Detection</li>{" "}
            </Link>
            <Link to="/statistics">
              {" "}
              <li>Statistics</li>{" "}
            </Link>
            <Link to="/resources">
              {" "}
              <li>Resources</li>{" "}
            </Link>
          </ul>

          <ul>
            <p className="footer-main-rgiht-header">Recheck </p>
            <Link to="/how-works">
              {" "}
              <li>How It Works</li>{" "}
            </Link>
            <Link to="/technology">
              {" "}
              <li>Technology</li>{" "}
            </Link>
            <Link to="/journey-mammogram">
              {" "}
              <li>Journey of a Mammogram</li>{" "}
            </Link>
            <Link to="/what-next">
              {" "}
              <li>What is Next?</li>{" "}
            </Link>
          </ul>

          <ul>
            <p className="footer-main-rgiht-header">People</p>
            <Link to="/stories">
              {" "}
              <li>Stories</li>{" "}
            </Link>
            <Link to="/donate">
              {" "}
              <li>Donate</li>{" "}
            </Link>
            <Link to="/research-fund">
              {" "}
              <li>Research Fund</li>{" "}
            </Link>
          </ul>

          <ul>
            <p className="footer-main-rgiht-header">Help</p>
            <Link to="/contact">
              {" "}
              <li>Contact</li>{" "}
            </Link>
            <Link to="/faq">
              {" "}
              <li>FAQ</li>
            </Link>
            <Link to="/stage-4-support">
              {" "}
              <li>Stage 4 Support</li>{" "}
            </Link>
            <Link to="/breast-exam-reminder">
              {" "}
              <li>Breast Self-Exam Reminder</li>{" "}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );


}








export default Footer;