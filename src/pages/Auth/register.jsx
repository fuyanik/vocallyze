import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./style/login.css"
import { ToastContainer, toast } from 'react-toastify';
import gV from "../../gV";
import { setGlobalState } from "../../hookState";
import { Helmet } from "react-helmet";
import { doc, setDoc, getDoc, arrayUnion, updateDoc   } from "firebase/firestore"; 
import { db } from "../../firebase";

const Register = ({isMailErr = false }) => {

    
  const auth = getAuth();
  const user = auth.currentUser;
  const [count, setCount] = useState(8);




  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const updatePay = async ()  => {
  
    const auth = getAuth();
    const user =  auth.currentUser;

   
       //fetch firebase data firestore
       const userRef = doc(db, "Mitrua", `${localStorage.getItem("mailAddress")}`);
       const docSnap = await getDoc(userRef);
       const data = docSnap.data();

       const rechecks = data.Rechecks;

       console.log(data)

       const returnRecheckNumber = async () => {

        
         

          rechecks[0].activeStep = 2;
          rechecks[0].isPay = true
        

          await updateDoc(userRef, { Rechecks: rechecks})


      }


       //Control user is have images or not for detect active step
       //...
       returnRecheckNumber();
   

    

  }

 // toast(error.code, { type: "error" });
  const handleRegister = async () => {

    try {
        await createUserWithEmailAndPassword(auth, localStorage.getItem("mailAddress"), password).then((userCredential) => {

            const user = userCredential.user
            updatePay()
            console.log(user)

             user && navigate("/user-panel")
       
        });
        updateProfile(auth.currentUser, { displayName: localStorage.getItem("name") });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            toast(error.code, { type: "error" });
          return;
        }
        if (error.code === 'auth/invalid-email') {
            toast(error.code, { type: "error" });
          return;
        }
      }
 
};



 

 

  return (
    <>
    
  <Helmet>
  <title>Medifyre - Register</title>
   <meta name="description" content="User Panel" />
</Helmet>

      {!gV.mq.matches && !isMailErr && (

        <div>
          <div className="slide-background"></div>
          <div className="slide-background2"></div>
        </div>
      )}
     <ToastContainer />
  
  
    
    <div className={`login-page `} >
        <div
          className={`${isMailErr ? "login-page__err" : "login-page__main"}`}
        >
          <Link style={{ textDecoration: "none", display: "flex" }} to="/">
            {" "}
            <img
              alt="medifyre logo"
              src="https://vitamu.imgix.net/MEDIFYRE-6.png?w=6400&h=3600&ar=6400%3A3600"
              className=" w-52"
            />
          </Link>

          <div className="login-page__main__form-area">
            <p className="login-page__main__form-area__title">Complete your account</p>
           
              <p className="login-page__main__form-area__title2 w-[80%] text-center">
              After setting your password, you will be directed to your user portal.
              </p>
           

            <div className="login-page__main__form-area__inputs">
              <input
                disabled={true }
                value={localStorage.getItem("mailAddress")}
                onChange={(e) => {
                 
                }}
                placeholder="Email"
                className="login-page__main__form-area__inputs__input"
              />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                type="password"
                className="login-page__main__form-area__inputs__input"
              />
              <input
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                placeholder="Confirm Password"
                type="password"
                className="login-page__main__form-area__inputs__input"
              />


              <div
                onClick={handleRegister}
                className="login-page__main__form-area__inputs__login-button"
              >
                Sign Up
              </div>
             
             
            </div>

            


          </div>

       

        </div>
      </div>

    
   
    </>
  );
}

export default Register;