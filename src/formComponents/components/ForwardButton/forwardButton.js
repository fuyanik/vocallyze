import React from 'react';
import "./forwardButton.css";




//gV.buttonType == 0  ?  ""Continue"""" : <MdOutlineArrowForward className='forward-icon ' />

const ForwardButton = ({className,forwardButtonClick, width,left,buttonText,onKeyDown}) => {

    return (
    
        <button 
        onKeyDown={onKeyDown}
        className={className}
        onClick= {forwardButtonClick}
        style = {{
        width: width,
        left: left
        }}
        
        > <span className='button-text'> { buttonText } </span> </button>
    )
    
    }




export default ForwardButton;