import React from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import gV from "../../gV";


const Popup = ({onDismiss, open, contents,className, close = true}) => {

  

  return (
    <>
      <BottomSheet
        className={className}
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ maxHeight }) => [0.99 * maxHeight, 0.83 * maxHeight]}
        defaultSnap={({ lastSnap, snapPoints }) => {
          lastSnap ?? Math.max(...snapPoints);
        }}
        blocking={false}
      >
        <div className="relative z-50">
      
        { close && <div className="absolute left-[85%] bg-[#000000] text-white text-md border border-[#000000] px-5 py-1 rounded-3xl cursor-pointer tracking-wide hover:shadow-xl "> {gV.mq.matches ? "X" :"Close"}</div>}
           
            {contents}
        
        </div>
     
     
      </BottomSheet>
    </>
  );
};

export default Popup;
