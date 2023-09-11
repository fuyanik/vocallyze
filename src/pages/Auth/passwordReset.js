import React from 'react'
import "./style/login.css"
import "./style/passwordReset.css"
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const PasswordReset = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
   
    const handleResetPassword = async () => {

        await sendPasswordResetEmail(auth, email).
        then(() => {
            navigate("/login")
        }).catch((error) => {
                console.log(error)
              toast(error.code, { type: "error" });
        });

    }


  return (
    <div className='password-reset'>
       <ToastContainer/>

           <img alt="image" src="https://vitamu.imgix.net/Group%201%20(3).png?auto=undefined%2Ccompress" className="w-32"/>

           <div className='password-reset__main'>
                <p className='password-reset__main__title'>Forgot Your Password?</p>
                <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Addres" className="login-page__main__form-area__inputs__input"/> 
                <div onClick={handleResetPassword} className="w-fit bg-pri text-white rounded-full py-2 px-4 items-center justify-center flex text-sm cursor-pointer">Send Password Reset</div>
           </div>
 


    </div>
  )
}

export default PasswordReset