import { useState } from "react";
import { Link } from "react-router-dom";
import gV from "../../../gV";
import BiRadsDropdown from "../../../homeComponents/BiRadsDropdown/biRadsDropdown";
import PrimaryButton from "../../../homeComponents/microComponents/primaryButton/primaryButton";

const UpsideFooter = () => {


  const [isHover, setIsHover] = useState(false);


  return (
    <>
      <div className="upside-footer relative">
        <p className="normal-text">We make sure you are not misdiagnosed or overdiagnosed.</p>


        {isHover && 
        
        <BiRadsDropdown
        onMouseLeave={() => setIsHover(false)}
        top={gV.mq.matches ? "50%" : "-45%"}
        left={gV.mq.matches ? "0%" : "-1%"}
        />}
        <PrimaryButton onMouse={()=>{setIsHover(true)}} to={"/form"} />

        <Link style={{ textDecoration: "none" }} to="/stories">
          <div className="button-human">
            <span className="buttonText-human"> Read Stories</span>
            <span className="line-human">|</span>
            <span className="arrow-human">➔</span>
          </div>
        </Link>
      </div>
    </>
  );
};
export default UpsideFooter;
