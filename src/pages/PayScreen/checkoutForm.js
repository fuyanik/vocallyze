
import React, { useEffect, useState } from "react";
import gV from "../../gV.js";

import { getAuth } from "firebase/auth";
import { setGlobalState, useGlobalState } from "../../hookState";


import {
  PaymentElement,
  useStripe,
  useElements,
 
} from "@stripe/react-stripe-js";
import "./style/payScreen.css";

import stripeImg from "./stripe.png";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js";


export default function CheckoutForm() {


  const navigate = useNavigate();




 // console.log(keys.stripePublishableKey);
  //console.log(`${keys.stripePublishableKey}`);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowTax, setIsShowTax] = useState(true);


  const auth = getAuth();
  const user =  auth.currentUser;

  const  mainPayAmount = useGlobalState("mainPayAmount");
  

  

  useEffect(() => {

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
         
          break;
        case "processing":
          setMessage("Your payment is processing.");
          
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

 

  const handleSubmit = async (e) => {

    e.preventDefault();





   
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

  
      //fetch firebase data firestore
      const userRef = doc(db, "Mitrua", `${user.email}`);
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();

      const rechecks = data.Rechecks;

      console.log(data)

      const returnRecheckNumber = async () => {

       
         const lastIndex = rechecks.length - 1;

         rechecks[0].activeStep = 2;
         rechecks[0].isPay = true
       

         await updateDoc(userRef, { Rechecks: rechecks})


     

    

      //Control user is have images or not for detect active step
      //...
      returnRecheckNumber();
  

     } 


    setIsLoading(true);

      // Make sure to change this to your payment completion page
       

        const result = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
              //return_url: "http://localhost:3000/user-panel"
              return_url: "https://mitrua.com/pay-succes"
              //return_url: "https://mitrua.com/pay-succes2"
          },
        });
    
        if (result.error) {
          // Show error to your customer (for example, payment details incomplete)
          console.log(result.error.message);
        }  

      
   


    setIsLoading(false);
  };



const TaxValue = () =>{
  var taxValue = (gV.payTotal / 100) * 8.875;
  return taxValue
}




  return (

    <form id="payment-form" onSubmit={handleSubmit}>
      
      

    { /* <p className="payment-form-head-text">Name on Card</p>
      <input className="nameİnput"/> }
}
     {/* <p className="payment-form-head-text">Credit Card</p> */}
     {/*  <img style={{width:"150px"}}  src={vitamuLogo}/ */}
      
      
     {/* payment element input remember input text area handle change and get default value */}
      <PaymentElement 
      
      id="payment-element" /> 

      <div className="price-exp">
        <div> <p>Recheck Fee </p> <p>{ mainPayAmount }</p></div>
        
       {gV.insuranceCompany == "none" ? null : <div style={{ width:"100%",borderBottom :"1px solid rgba(93, 90, 90, 0.216"}} > <p>Active Insurance - {gV.insuranceCompany} </p> <p>-${ (gV.discountAmount | 0) }</p></div>}
        <div > {(isShowTax || gV.insuranceCompany == "none") ? <div style={{ width:"100%",borderBottom :"1px solid rgba(93, 90, 90, 0.216"}}> <p>Tax </p> <p>${ (TaxValue().toFixed(2))   }</p> </div> : <div className="price-exp-tax-more" onClick={()=>{setIsShowTax(true)}}  > <p >More...</p></div>  } </div>
        <div> <p>Total </p> <p>${ (gV.payTotal + TaxValue()).toFixed(2) }</p></div>
      </div>
     
     

      <button onClick={()=>{console.log("pay click")}} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Continue"}
        </span>
      </button>
     

      <img alt="image"  className="stripe-img" src={stripeImg} />

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
//ben bir davarım







/*const handleSignup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, gV.MailAddres, gV.password);
    updateProfile(auth.currentUser, { displayName: gV.userName });

   
  
  } catch (error) {
   console.log(error)
  }
}; */