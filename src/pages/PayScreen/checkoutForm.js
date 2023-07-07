
import React, { useEffect, useState } from "react";
import gV from "../../gV.js";
import { db } from "../../firebase";
import { Timestamp} from 'firebase/firestore';
import { doc, setDoc,   } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { setGlobalState, useGlobalState } from "../../hookState";


import {
  PaymentElement,
  useStripe,
  useElements,
 
} from "@stripe/react-stripe-js";
import "./style/payScreen.css";

import stripeImg from "./stripe.png";


export default function CheckoutForm() {




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

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
  
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "http://localhost:3000/pay-succes"
        return_url: "http://mitrua.com/pay-succes"
       

      },  
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
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