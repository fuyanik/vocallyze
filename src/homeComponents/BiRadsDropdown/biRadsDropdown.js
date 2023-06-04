import gV from "../../gV";
import { Link } from "react-router-dom";
import "./biRadsDropdown.css";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setGlobalState } from "../../hookState";

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


  return (
    <div
      style={{
        top: top,
        left: left,
      }}
      onMouseLeave={onMouseLeave}
      className="bi-rads-dropdown z-20"
    >
      <h2 className="bi-rads-dropdown-header">Choose your Bi-rads score:</h2>
      
      <Link style={{ textDecoration: "none" }} to="/form">
        {" "}
        <p
          className="bi-rads-dropdown-item"
          onClick={() => {
            
            setGlobalState("isSummaryPopUp", false)

            if (isPay) {
                gV.payType = "secondRecheck";
                gV.MailAddres = user.email;
            }
            gV.biRads = "1";
            gV.p = 0;
            gV.isShowBiradsPage = false;
          }}
        >
          Bi-rads 1 ➔
        </p>{" "}
      </Link>
     
      <Link style={{ textDecoration: "none" }} to="/form">
        {" "}
        <p
          className="bi-rads-dropdown-item"
          onClick={() => {
            setGlobalState("isSummaryPopUp", false)

            if (isPay) {
                gV.payType = "secondRecheck";
                gV.MailAddres = user.email;
            }
            
            gV.biRads = "2";
            gV.p = 0;
            gV.isShowBiradsPage = false;
          }}
        >
          Bi-rads 2 ➔
        </p>{" "}
      </Link>
     
      <Link style={{ textDecoration: "none" }} to="/form">
        {" "}
        <p
          className="bi-rads-dropdown-item"
          onClick={() => {
            setGlobalState("isSummaryPopUp", false)

            if (isPay) {
                gV.payType = "secondRecheck";
                gV.MailAddres = user.email;
            }
            gV.biRads = "3";
            gV.p = 0;
            gV.isShowBiradsPage = false;
          }}
        >
          Bi-rads 3 ➔
        </p>{" "}
      </Link>
    
      <Link style={{ textDecoration: "none" }} to="/form">
        {" "}
        <p
          className="bi-rads-dropdown-item"
          onClick={() => {

            setGlobalState("isSummaryPopUp", false)
            if (isPay) {
                gV.payType = "secondRecheck";
                gV.MailAddres = user.email;
            }
            gV.biRads = "4";
            gV.isShowBiradsPage = true;
            gV.isShowBiRads123 = false;
            gV.p = -1;
          }}
        >
          Bi-rads 4 ➔
        </p>{" "}
      </Link>

      <Link style={{ textDecoration: "none" }} to="/form">
        {" "}
        <p
          className="bi-rads-dropdown-item bi-rads-dropdown-item-last-child"
          onClick={() => {
            gV.p = -1;
          }}
        >
           Bi-rads 5 or Bi-rads 6 ➔{" "}
        </p>{" "}
      </Link>
    </div>
  );
};

export default BiRadsDropdown;
