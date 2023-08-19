import gV from "../../gV";
import { Link, useNavigate } from "react-router-dom";
import "./biRadsDropdown.css";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setGlobalState } from "../../hookState";
import SelectBodyParts from "../../pages/Forms/components/selectBodyParts";
import ScanType from "../../pages/Forms/components/selectScan";

const BiRadsDropdown = ({ onMouseLeave, top, left }) => {
    
    const auth = getAuth();
    const user = auth.currentUser;

    const [isPay, setisPay] = useState(null)

    const getInfo = async () => {

        const docRef = doc(db, "VitamuUsersREAL", `${user.email}`);

        await getDoc(docRef).then((doc) => {

            if (doc.exists()) {

                if (doc.data().FirstRecheck.isPay) {
                    setisPay(true)
                } else {
                    setisPay(false)
                }
            }


        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    useEffect(() => {
        getInfo()
        
    }, [isPay])


    const navigate = useNavigate();

  return (
    <div
      style={{
        top: top,
        left: left,
      }}
      onMouseLeave={onMouseLeave}
      className="bi-rads-dropdown    z-50"
    >

      <div className="flex flex-col items-center font-product  gap-3 rounded-full ">
          <SelectBodyParts isOutside={true} />
          <ScanType isOutside={true} />
         <div onClick={()=>{navigate("/form-new")}} className=" flex items-center justify-center  bg-[#ff4949]   duration-300 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl">Get Started</div>
        </div>
     
     
   
    </div>
  );
};

export default BiRadsDropdown;
