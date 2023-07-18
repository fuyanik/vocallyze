import "./navbar.css"
import {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
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
   const [isDropdown, setDropdown] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);


    //Menu Dropdown  
    const [menuDropdown1, setMenuDropdown1] = useState(false);
    const [menuDropdown2, setMenuDropdown2] = useState(false);

 
  //navbar change opacitiy and color when user scroll in
   const [scrollNumber, setScrollNumber] = useState(0);

   //set open dropdown menu
   const [showDropdown, setShowDropdown] = useState(0);

   const auth = getAuth();
   const user = auth.currentUser;
   
   const navigate = useNavigate();



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

    //scrollNumber  < 3 ? setIsWhite(false) : setIsWhite(true);
   
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
    onMouseLeave={() => setShowDropdown(0)}  className="Navbar"   style={{ backgroundColor: isWhite && "white" }}  onMouseMove={() => {  setIsWhite(true); }} >
 
    <div className=" font-bold text-black gap-4 hidden lg:flex font-product tracking-wide">
       <div className="flex items-center  gap-1 cursor-pointer"> <p>SCANS </p>  <img className={`   mt-[3px]  top-1 ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="12" height="4" src="https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png" alt="collapse-arrow"/> </div>
       <div className="cursor-pointer"> <p> HEALTH HUB </p> </div>
       <div className="flex items-center  gap-1 cursor-pointer"> <p>COMPANY </p>  <img className={`   mt-[3px]  top-1 ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="12" height="4" src="https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png" alt="collapse-arrow"/> </div>
    </div>


     {/* Logo */}
     <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex  ">
      <Link style={{ textDecoration: "none", display: "flex" }} to="/">
        <img className="vitamu-logo z-0" src="https://vitamu.imgix.net/Group%202.png?auto=undefined%2Ccompress" alt="vitamu" />{" "}
      </Link>
     </div>


    {/* Mobile Menu */}
     {gV.mq.matches  && 
     <div className= {` text-pri font-product`} > 
        <p onClick={()=>{setIsMenuOpen(!isMenuOpen)}}>Menu</p>
       
        <section className= {`  ${isMenuOpen ? "flex" : "hidden"}  flex-col gap-8  absolute top-0 left-0 z-50 justify-normal  p-8 h-screen animate-stretchWidth   bg-white  ` }>

        {/* Top */ }
         <header className="flex animate-visible  justify-between items-center">  
          
            <img className="w-36"  src="https://vitamu.imgix.net/Group%202.png?auto=undefined%2Ccompress" alt="vitamu" />{" "}
            <img className="relative left-2"  onClick={()=>{setIsMenuOpen(false)}} width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="delete-sign"/>
        
        </header>
        
   
         {/* Main */ }
        <div className="  font-bold text-pri flex flex-col gap-6 text-[20px] animate-visible  font-product tracking-wide">
          
         {/* Item 1  */}
         <div>
           
           <div onClick={()=>{setMenuDropdown1(!menuDropdown1)}} className="flex items-center text-[22px]  gap-2 cursor-pointer">  
              <p>Scans </p>  
              <img  className={`absolute   right-6 lg:right-1 text-[13px] ${!menuDropdown1 ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/142b6f/collapse-arrow.png" alt="collapse-arrow"/>
           </div>
          
          { menuDropdown1 && <div className="text-[17px] animate-fadeIn pl-3 pt-1  font-normal"> 
             <p>Scap Types</p>
             <p>Body Parts </p>
             <p>Cities</p>
           </div>}
        
         </div>

          {/* Item 2  */}

          <div>
           
           <div className="flex items-center text-[22px]  gap-2 cursor-pointer">  
              <p>Health Hub </p>  
           </div>
          
           <div className="text-[17px] pl-3 pt-1 hidden font-normal"> 
             <p>Scap Types</p>
             <p>Body Parts </p>
             <p>Cities</p>
           </div>
        
         </div>

          {/* Item 3  */}

          <div>
           
           <div onClick={()=>{setMenuDropdown2(!menuDropdown2)}}  className="flex items-center text-[22px]  gap-2 cursor-pointer">  
              <p>Company </p>  
              <img  className={`absolute   right-6 lg:right-1 text-[13px] ${!menuDropdown2 ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/142b6f/collapse-arrow.png" alt="collapse-arrow"/>
           </div>
          
           { menuDropdown2 && <div className=" animate-fadeIn text-[17px] pl-3 pt-1  font-normal"> 
             <p>Scap Types</p>
             <p>Body Parts </p>
             <p>Cities</p>
           </div>}
        
         </div>

          {/* Item 4  */}

          <div>
           
           <div className="flex items-center text-[22px]  gap-2 cursor-pointer">  
              <p>Help </p>  
           </div>
          
           <div className="text-[17px] pl-3 pt-1 hidden font-normal"> 
             <p>Scap Types</p>
             <p>Body Parts </p>
             <p>Cities</p>
           </div>
        
         </div>


       
          
          
         
        </div>


         {/* Get Started Button*/ }
        <div onClick={()=>{navigate("/form-new")}} className="animate-visible flex items-center justify-center  bg-[#ff4949]  hover:bg-[#ff595990] duration-300 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl">Get Started</div>

        

        
        </section>
     
      </div>}
 

    {/* Mobile Logo*/}
    { gV.mq.matches && <Link
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
    </Link>}
    
    {gV.mq.matches && MobileUserPortal()}


   

    {/* User Portal - Get Started */}
    <div className="nav-item-and-button-right">
      {/* User Portal */}
      {userPortal()}

      {/* Get Started Button */}
      <div style={{ position: "relative" }}>
      
        <PrimaryButton to={"/get-started"}  />
      </div>

      {/* İf user is logged in, show USER PANEL button, If user not logged in Show SIGN IN button */}
    </div>
 
  </div>
);

}

export default Navbar;

   
   
  
   
   

   

