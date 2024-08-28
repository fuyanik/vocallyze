import React from 'react'
import "./style/primaryButton.css"
import {Link} from 'react-router-dom';

const PrimaryButton = ({onMouse,border,to,width,bg,color, height,text = "Get Started"}) => {
  return (
    <>
      <Link  style={{ textDecoration: "none",}} to={to}> 
         <div style={{width:width, height:height, backgroundColor:bg, color: color,border:border}} className="primary-button hover:bg-prim duration-500" onMouseMove={onMouse}  >
            <span style={{letterSpacing:"0.6px"}} className="primary-button__text">{text}</span>
            <span className="primary-button__line">|</span>
            <span className="primary-button__arrow">➔</span>
        </div>  
      </Link>
    </>
  )
}

export default PrimaryButton;
