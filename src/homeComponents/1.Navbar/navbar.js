import "./navbar.css"
import {useState} from 'react';
import { Link} from 'react-router-dom';
import NavbarDropdown from "./navbarDropdown";
import dropdown1 from "./images/dropdown1.jpg"
import dropdown2 from "./images/dropdown2.jpg"
import dropdown3 from "./images/dropdown3.jpg"
import vitamuLogo from "./images/vitamuLogo.png"
import { getAuth } from "firebase/auth";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV";




const Navbar = ({mobileMenuText,mobileMenuTo}) => { 
   
   //navbar change opacitiy and color when user hover in
   const [isWhite, setIsWhite] = useState(false);
   const [isHover, setIsHover] = useState(false);
 
  //navbar change opacitiy and color when user scroll in
   const [scrollNumber, setScrollNumber] = useState(0);

   //set open dropdown menu
   const [showDropdown, setShowDropdown] = useState(0);

   const auth = getAuth();
   const user = auth.currentUser;



   //loading UserPanel or Sıgn In Button depend on if user is logged in or not
   const userPortal = () => {
       if(user !== null){
        return   <Link  style={{  textDecoration: "none",}}  to="/user-panel"> 
    
    <div style={{display:"flex", gap:"5px", justiftContent:"center", alignItems:"center"}}>
    <svg
              class="AccountDropdown__AccountIcon-sc-1wf0fy0-5 cyzueM"
              width="24"
              height="24"
              version="1.1"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                <g
                  fill="#142B6F"
                  fill-rule="nonzero"
                  transform="translate(-955.000000, -30.000000)"
                >
                  <g>
                    <g transform="translate(955.000000, 30.000000)">
                      <path d="M8.54396677,12.6132965 C7.592539,11.703026 7,10.4207105 7,9 C7,6.23857625 9.23857625,4 12,4 C14.7614238,4 17,6.23857625 17,9 C17,10.4207105 16.4074609,11.703026 15.4560332,12.6132965 C18.1833676,13.6177866 20.3521921,15.7769777 21.3696494,18.4980124 C20.8931099,19.0927328 20.3611216,19.6411047 19.781523,20.135289 C18.9413768,16.6163976 15.7762347,14 12,14 C8.22376537,14 5.05862315,16.6163976 4.21847698,20.135289 C3.63887839,19.6411047 3.10689,19.0927328 2.63035063,18.4980124 C3.64780782,15.7769777 5.81663235,13.6177866 8.54396677,12.6132965 Z M12,12 C13.6568542,12 15,10.6568543 15,9 C15,7.34314575 13.6568542,6.00000001 12,6.00000001 C10.3431458,6.00000001 9,7.34314575 9,9 C9,10.6568543 10.3431458,12 12,12 Z"></path>
                      <path d="M12,22.0680268 C17.5477849,22.0680268 22.0517918,17.56402 22.0517918,12 C22.0517918,6.43597997 17.5477849,1.93197312 12,1.93197312 C6.45221504,1.93197312 1.94820819,6.43597997 1.94820819,12 C1.94820819,17.56402 6.45221504,22.0680268 12,22.0680268 Z M12,23.9999999 C5.37258301,23.9999999 0,18.6274171 0,12 C0,5.37258301 5.37258301,0 12,0 C18.627417,0 24,5.37258301 24,12 C24,18.6274171 18.627417,23.9999999 12,23.9999999 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
    </div>
    
         </Link> 

      }
      else{
        return  <Link style={{  textDecoration: "none",}} to="/login"> 

    <div style={{display:"flex", gap:"5px", justiftContent:"center", alignItems:"center"}}>
    <svg
              class="AccountDropdown__AccountIcon-sc-1wf0fy0-5 cyzueM"
              width="24"
              height="24"
              version="1.1"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                <g
                  fill="#142B6F"
                  fill-rule="nonzero"
                  transform="translate(-955.000000, -30.000000)"
                >
                  <g>
                    <g transform="translate(955.000000, 30.000000)">
                      <path d="M8.54396677,12.6132965 C7.592539,11.703026 7,10.4207105 7,9 C7,6.23857625 9.23857625,4 12,4 C14.7614238,4 17,6.23857625 17,9 C17,10.4207105 16.4074609,11.703026 15.4560332,12.6132965 C18.1833676,13.6177866 20.3521921,15.7769777 21.3696494,18.4980124 C20.8931099,19.0927328 20.3611216,19.6411047 19.781523,20.135289 C18.9413768,16.6163976 15.7762347,14 12,14 C8.22376537,14 5.05862315,16.6163976 4.21847698,20.135289 C3.63887839,19.6411047 3.10689,19.0927328 2.63035063,18.4980124 C3.64780782,15.7769777 5.81663235,13.6177866 8.54396677,12.6132965 Z M12,12 C13.6568542,12 15,10.6568543 15,9 C15,7.34314575 13.6568542,6.00000001 12,6.00000001 C10.3431458,6.00000001 9,7.34314575 9,9 C9,10.6568543 10.3431458,12 12,12 Z"></path>
                      <path d="M12,22.0680268 C17.5477849,22.0680268 22.0517918,17.56402 22.0517918,12 C22.0517918,6.43597997 17.5477849,1.93197312 12,1.93197312 C6.45221504,1.93197312 1.94820819,6.43597997 1.94820819,12 C1.94820819,17.56402 6.45221504,22.0680268 12,22.0680268 Z M12,23.9999999 C5.37258301,23.9999999 0,18.6274171 0,12 C0,5.37258301 5.37258301,0 12,0 C18.627417,0 24,5.37258301 24,12 C24,18.6274171 18.627417,23.9999999 12,23.9999999 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
    </div>
        
        </Link>
      }


    };

    const MobileUserPortal = () => {
      if (user !== null) {
        return (
          <Link style={{ textDecoration: "none" }} to="/user-panel">
            <svg
              class="AccountDropdown__AccountIcon-sc-1wf0fy0-5 cyzueM"
              width="24"
              height="24"
              version="1.1"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                <g
                  fill="#142B6F"
                  fill-rule="nonzero"
                  transform="translate(-955.000000, -30.000000)"
                >
                  <g>
                    <g transform="translate(955.000000, 30.000000)">
                      <path d="M8.54396677,12.6132965 C7.592539,11.703026 7,10.4207105 7,9 C7,6.23857625 9.23857625,4 12,4 C14.7614238,4 17,6.23857625 17,9 C17,10.4207105 16.4074609,11.703026 15.4560332,12.6132965 C18.1833676,13.6177866 20.3521921,15.7769777 21.3696494,18.4980124 C20.8931099,19.0927328 20.3611216,19.6411047 19.781523,20.135289 C18.9413768,16.6163976 15.7762347,14 12,14 C8.22376537,14 5.05862315,16.6163976 4.21847698,20.135289 C3.63887839,19.6411047 3.10689,19.0927328 2.63035063,18.4980124 C3.64780782,15.7769777 5.81663235,13.6177866 8.54396677,12.6132965 Z M12,12 C13.6568542,12 15,10.6568543 15,9 C15,7.34314575 13.6568542,6.00000001 12,6.00000001 C10.3431458,6.00000001 9,7.34314575 9,9 C9,10.6568543 10.3431458,12 12,12 Z"></path>
                      <path d="M12,22.0680268 C17.5477849,22.0680268 22.0517918,17.56402 22.0517918,12 C22.0517918,6.43597997 17.5477849,1.93197312 12,1.93197312 C6.45221504,1.93197312 1.94820819,6.43597997 1.94820819,12 C1.94820819,17.56402 6.45221504,22.0680268 12,22.0680268 Z M12,23.9999999 C5.37258301,23.9999999 0,18.6274171 0,12 C0,5.37258301 5.37258301,0 12,0 C18.627417,0 24,5.37258301 24,12 C24,18.6274171 18.627417,23.9999999 12,23.9999999 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </Link>
        );
      } else {
        return (
          <Link style={{ textDecoration: "none" }} to="/login">
            <svg
              class="AccountDropdown__AccountIcon-sc-1wf0fy0-5 cyzueM"
              width="24"
              height="24"
              version="1.1"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                <g
                  fill="#142B6F"
                  fill-rule="nonzero"
                  transform="translate(-955.000000, -30.000000)"
                >
                  <g>
                    <g transform="translate(955.000000, 30.000000)">
                      <path d="M8.54396677,12.6132965 C7.592539,11.703026 7,10.4207105 7,9 C7,6.23857625 9.23857625,4 12,4 C14.7614238,4 17,6.23857625 17,9 C17,10.4207105 16.4074609,11.703026 15.4560332,12.6132965 C18.1833676,13.6177866 20.3521921,15.7769777 21.3696494,18.4980124 C20.8931099,19.0927328 20.3611216,19.6411047 19.781523,20.135289 C18.9413768,16.6163976 15.7762347,14 12,14 C8.22376537,14 5.05862315,16.6163976 4.21847698,20.135289 C3.63887839,19.6411047 3.10689,19.0927328 2.63035063,18.4980124 C3.64780782,15.7769777 5.81663235,13.6177866 8.54396677,12.6132965 Z M12,12 C13.6568542,12 15,10.6568543 15,9 C15,7.34314575 13.6568542,6.00000001 12,6.00000001 C10.3431458,6.00000001 9,7.34314575 9,9 C9,10.6568543 10.3431458,12 12,12 Z"></path>
                      <path d="M12,22.0680268 C17.5477849,22.0680268 22.0517918,17.56402 22.0517918,12 C22.0517918,6.43597997 17.5477849,1.93197312 12,1.93197312 C6.45221504,1.93197312 1.94820819,6.43597997 1.94820819,12 C1.94820819,17.56402 6.45221504,22.0680268 12,22.0680268 Z M12,23.9999999 C5.37258301,23.9999999 0,18.6274171 0,12 C0,5.37258301 5.37258301,0 12,0 C18.627417,0 24,5.37258301 24,12 C24,18.6274171 18.627417,23.9999999 12,23.9999999 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </Link>
        );
      }
    };
 
 
   window.addEventListener('scroll', function() {
   
    setScrollNumber(window.pageYOffset);

    scrollNumber  < 3 ? setIsWhite(false) : setIsWhite(true);
   
    });

   
    //dropdown pages header and links
   const LinkHeader = (to,text) => {
    return(
      <>
      {<Link to={to} style={{textDecoration:'none'}} >  <h2> {text}  </h2> </Link>}
      </>
    )
   }


return (
  <div
    onMouseLeave={() => setShowDropdown(0)}
    className="Navbar"
    style={{ backgroundColor: isWhite && "white" }}
    onMouseMove={() => {
      setIsWhite(true);
    }}
  >
    {showDropdown === 1 && (
      <NavbarDropdown
        image="https://vitamu.imgix.net/dropdown1.jpg?auto=undefined%2Ccompress"
        line1head2={LinkHeader("/missed-diagnosis", "Missed Diagnosis ➔ ")}
        line1text2="10% of breast cancer cases are missed on mammogram screening. Learn how it affects lives."
        line1head1={LinkHeader("/human-error", "Human Error ➔")}
        line1text1="Learn what human error is and why it happens   "
        line2head1={LinkHeader("/early-detection", "Early Diagnosis ➔")}
        line2text1="It saves lives."
        line2head2={LinkHeader("/statistics", "Statistics ➔ ")}
        line2text2="U.S. breast cancer statistics are here."
        line2head3={LinkHeader("/resources", "Resources ➔ ")}
        line2text3="Breast cancer, A to Z."
        onMouseLeave={() => setShowDropdown(0)}
      />
    )}

    {showDropdown === 2 && (
      <NavbarDropdown
        image="https://vitamu.imgix.net/dropdown2.jpg?auto=undefined%2Ccompress"
        line1head1={LinkHeader("/how-it-works", "How It Works ➔")}
        line1text1="Learn what recheck is and how it works."
        line1head2={LinkHeader("/technology", "Technology ➔ ")}
        line1text2="Meet our artificial intelligence used by radiologists."
        line1head3={LinkHeader(
          "/journey-mammogram",
          "Journey of a Mammogram ➔"
        )}
        line1text3="Discover how your mammogram is evaluated on a recheck."
        line2head1={LinkHeader("/radiology-team", "Radiology Team ➔")}
        line2text1="Meet the people who carry out our rechecks."
        line2head2={LinkHeader("/what-next", "What is Next? ➔ ")}
        line2text2="You have your recheck results. Here is what comes next."
        line2head3={LinkHeader(
          "/recheck-report-samples",
          "Recheck Report Samples ➔"
        )}
        line2text3="Want to learn about scenarios, see recheck report samples."
        onMouseLeave={() => setShowDropdown(0)}
      />
    )}

    {showDropdown === 3 && (
      <NavbarDropdown
        image="https://vitamu.imgix.net/dropdown3.jpg?auto=undefined%2Ccompress"
        line1head1={LinkHeader("/our-story", "Our Story ➔ ")}
        line1text1="This is how we started our journey."
        line1head2={LinkHeader("/stories", "Stories ➔ ")}
        line1text2="Meet the women we have helped. "
        line1head3={LinkHeader("/numbers", "Numbers ➔ ")}
        line1text3="We recheck 200+ mammograms per day. Live stats here."
        line2head1={LinkHeader("/donate", "Donate ➔ ")}
        line2text1="Your donations, however small, keep people alive. Here is a list of proposed charities."
        line2head2={LinkHeader("/research-fund", "Research Fund ➔ ")}
        line2text2="We support entrepreneurs, researchers, and physicians who are dedicated to breast cancer diagnosis and treatment."
        onMouseLeave={() => setShowDropdown(0)}
      />
    )}
    {showDropdown === 4 && (
      <NavbarDropdown
        image="https://vitamu.imgix.net/dropdown4.jpg?auto=undefined%2Ccompress"
        line1head1={LinkHeader("/contact", "Contact ➔ ")}
        line1text1="Any questions? We are here to help."
        line1head2={LinkHeader("/faq", "FAQ ➔ ")}
        line1text2="Here are the answers to some frequently asked questions "
        line1head3={LinkHeader("/stage-4-support", "Stage 4 Support ➔ ")}
        line1text3="Have you been diagnosed with stage 4 breast cancer? We can help you"
        line2head1={LinkHeader("/copy-mammogram", "Get a Copy of  Your Mammogram ➔ ")}
        line2text1="Learn how to get a copy of your mammogram, for both recheck and future mammogram screenings."
        line2head2={LinkHeader(
          "/breast-exam-reminder",
          "Breast Self-Exam Reminder ➔"
        )}
        line2text2="Early detection saves lives. With our reminder, you will never skip a single breast self-exam."
        onMouseLeave={() => setShowDropdown(0)}
      />
    )}

     {/* Facts-Recheck-People-Help */}
     <div className="nav-items-and-button">
      <Link style={{ textDecoration: "none", display: "flex" }} to="/">
        {" "}
        <img className="vitamu-logo z-0" src="https://vitamu.imgix.net/Group%202.png?auto=undefined%2Ccompress" alt="vitamu" />{" "}
      </Link>

      <ul className="nav-items">
        <li className="nav-item" onMouseMove={() => setShowDropdown(1)}>
          Facts
        </li>
        <li className="nav-item" onMouseMove={() => setShowDropdown(2)}>
          Recheck
        </li>
        <li className="nav-item" onMouseMove={() => setShowDropdown(3)}>
          People
        </li>
        <li className="nav-item" onMouseMove={() => setShowDropdown(4)}>
          {" "}
          Help
        </li>
      </ul>
     </div>

    {/* Mobile Menu */}
    <Link
      className="mobile-dropdown-menu"
      style={{ textDecoration: "none", display: "inline" }}
      to={mobileMenuTo}
    >
      {" "}
      <div className="mobile-dropdown-menu"> {mobileMenuText}</div>{" "}
    </Link>

    {/* Mobile Logo*/}
    <Link
      className="navbar-logo"
      style={{ textDecoration: "none", display: "flex" }}
      to="/"
    >
      {" "}
      <img
        className="navbar-logo vitamu-logo"
        src="https://vitamu.imgix.net/Group%202.png?auto=undefined%2Ccompress"
        alt="vitamu"
      />{" "}
    </Link>

    {gV.mq.matches && MobileUserPortal()}


   

    {/* User Portal - Get Started */}
    <div className="nav-item-and-button-right">
      {/* User Portal */}
      {userPortal()}

      {/* Get Started Button */}
      <div style={{ position: "relative" }}>
        {isHover && (
          <BiRadsDropdown
            onMouseLeave={() => {
              setIsHover(false);
            }}
            top={"-10%"}
            left={"-4vw"}
          />
        )}
        <PrimaryButton to={"/form"} onMouse={() => setIsHover(true)} />
      </div>

      {/* İf user is logged in, show USER PANEL button, If user not logged in Show SIGN IN button */}
    </div>
 
  </div>
);

}

export default Navbar;

   
   
  
   
   

   

