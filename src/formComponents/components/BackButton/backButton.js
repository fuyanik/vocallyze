import { MdArrowBack } from "react-icons/md";
import "./backButton.css"
import React from 'react';


const BackButton = ({className,backButtonClick, left}) => {


return (

    
<button className={`${className}`}  onClick={backButtonClick}  

style={{

left: left

}}> <MdArrowBack className="back-icon"  



/>  </button>



)

}

export default BackButton;