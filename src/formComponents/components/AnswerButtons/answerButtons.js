import "./answerButtons.css";
const AnswerButtons = ({text,handleClick,className,marginTop}) => { 

 

    return(
     
       <div style={{marginTop: marginTop}} className={className} onClick={handleClick} >
         {text}
        </div>
    )
}

export default AnswerButtons;