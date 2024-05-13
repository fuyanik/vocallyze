import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./style/login.css"
import { ToastContainer, toast } from 'react-toastify';
import gV from "../../gV";
import { setGlobalState } from "../../hookState";
import { Helmet } from "react-helmet";


const Login = ({isMailErr = false }) => {

    
  const auth = getAuth();
  const user = auth.currentUser;
  const [count, setCount] = useState(8);

  const [isUserFound, setIsUserFound] = useState(false)



  useEffect(() => {

    const interval = setInterval(() => {
      setCount(count - 1);

       if(user){
        !isMailErr && setIsUserFound(true)

         setTimeout(()=>{
          !isMailErr &&   navigate("/user-panel")
         }, 1000)
      } 
    
    }, 1000);

    return () => clearInterval(interval);
 
  }, [count]);



  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSendMail, setIsSendMail]= useState(false);


  useEffect(() => {

    if(isMailErr){
     setEmail(gV.MailAddres)
    }

  }, [email]);




  const handleLogin = async () => {

    try {
      await signInWithEmailAndPassword(auth, email, password);
       {

        if(isMailErr){
          setGlobalState("isLoginPopup", false);
        }
        else {
          
          email === "mustafa@vitamu.com" ? navigate("/panel") :  navigate("/user-panel") 
        }
    }  
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };

  var actionCodeSettings = {
    // After password reset, the user will be give the ability to go back
    // to this page.
    url: 'https://www.mitrua.com/login',
    handleCodeInApp: false
  };

  const handleResetPassword = async () => {

    await sendPasswordResetEmail(auth, gV.MailAddres, actionCodeSettings).
    then(() => {

     
         setIsSendMail(true)
       
        
    }).catch((error) => {
            console.log(error)
          toast(error.code, { type: "error" });
    });

};



  return (
    <>
    
  <Helmet>
  <title>Vitamu - User Panel</title>
   <meta name="description" content="User Panel" />
</Helmet>

      {!gV.mq.matches && !isMailErr && (

        <div>
          <div className="slide-background"></div>
          <div className="slide-background2"></div>
        </div>
      )}
      {!isMailErr && <ToastContainer />}
  
    {!isUserFound ?  
    
    <div className={`login-page ${isMailErr ? "lg:mt-0" : "lg:mt-12"}  mt-10`} >
        <div
          className={`${isMailErr ? "login-page__err" : "login-page__main"}`}
        >
          <Link style={{ textDecoration: "none", display: "flex" }} to="/">
            {" "}
            <img
              alt="image"
              src="https://vitamu.imgix.net/Group%201%20(3).png?auto=undefined%2Ccompress"
              className=" w-32"
            />
          </Link>

          <div className="login-page__main__form-area">
            <p className="login-page__main__form-area__title">Welcome Back!</p>
            {isMailErr ? (
              <p className="login-page__main__form-area__title2 w-[90%] text-[15px] leading-1 text-center">
               It seems you've visited Mitrua.com before. There's an account linked to this email address. Please enter your password. If you can't recall your password, click on "reset password."
              </p>
            ) : (
              <p className="login-page__main__form-area__title2">
                Please sign in to your account
              </p>
            )}

            <div className="login-page__main__form-area__inputs">
              <input
                disabled={isMailErr ? true : false}
                value={isMailErr ? gV.MailAddres : null}
                onChange={(e) => {
                  setEmail(e.target.value);
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
              <div
                onClick={handleLogin}
                className="login-page__main__form-area__inputs__login-button"
              >
                Login
              </div>

             
                <p onClick={handleResetPassword}className="login-page__main__form-area__inputs__forgot-password ">
                  Reset your password
                </p>
             
            </div>

            <div
              style={{ display: "none" }}
              className="login-page__main__form-area__divider"
            >
              <div className="login-page__main__form-area__divider__line"></div>
              <p className="login-page__main__form-area__divider__text">Or</p>
              <div className="login-page__main__form-area__divider__line"></div>
            </div>

            <div
              style={{ display: "none" }}
              className="login-page__main__form-area__login-with-google"
            >
              {" "}
              <img
                className="login-page__main__form-area__login-with-google__logo"
                src="https://img.icons8.com/fluency/240/null/google-logo.png"
              />{" "}
              <p>Login with Google </p>
            </div>
          
            {isSendMail && <div className="w-[80%] animate-fadeIn text-[14px] flex  py-1 gap-5 px-4 items-center justify-between text-[white] bg-[#198754] rounded-xl ">
              <img width="32" height="32" src="https://img.icons8.com/ffffff/checked--v1.png" alt="checked--v1"/> 
              <p> We sent your new password to your e-mail address, please check your inbox.</p>
            </div>}

          </div>

          {!isMailErr && (
            <p className="login-page__main__footer-text">
              Don't have an account?
            </p>
          )}
          {!isMailErr && (
            <Link className="style-none" to="/form-new">
              <p className="border-b border-black">Get Started</p>
            </Link>
          )}

        </div>
      </div>

      : 
      
      <div className="flex items-center justify-center w-screen h-screen bg-slate-200">
          <div className="text-[green] font-bold shadow-2xl bg-white border-red-900 rounded-2xl px-6 py-2">User Found.</div>
      </div>
   }
   
    </>
  );
}

export default Login;