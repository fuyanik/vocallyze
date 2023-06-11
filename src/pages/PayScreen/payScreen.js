import gV from "../../gV";
import "./style/payScreen.css"
import { setGlobalState } from "../../hookState";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import { getAuth } from "firebase/auth";




//const keys = require("../../config/keys");

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

//const stripePromise = loadStripe("pk_live_51KlHkRLdTjVwVxF21mzqKe98iR2Mr08Ifu1jG8HNhtOehEHqArQBCjBZ6nFqP4soxjc0o72L5NtF0FCSWaq7PalD00Zisw6XqX");
const stripePromise = loadStripe("pk_test_51LOrQYKGr3XuaAt4k9NHq0fW5AMPq71nMA6c9SIPVvRXadetwvACfgR4Fk5gk6zs6hnHrH0VdqevAoMHa8f9s2PB00txc9mDlI");


// const stripePromise = loadStripe(keys.stripePublishableKey);

const PayScreen = () => { 

   

   

      const auth = getAuth();
      const user = auth.currentUser;
     
   
    

//close page
const ClosehandleClick = () => { 
    setGlobalState("isPayScreen", false);
}


 

const fetchData = async (totalValue) => {
  
 await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
   
    body: JSON.stringify({
       items: [{ 
        amount:  totalValue,
        user_mail: "furkanuyanik37@gmail.com",
        name: "asdsd",
        id: "vitamu", 
      
      }
      ],
      }),

  })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
};



const [clientSecret, setClientSecret] = useState("");

useEffect(() => {

  var taxValue = (gV.payTotal / 100) * 8.875;
  var totalValue = gV.payTotal + taxValue;
  //replace . with nothing 
  totalValue = totalValue | 0
  // add total value end 2 zeros and return string
  totalValue = totalValue + "00"
 
  totalValue = totalValue.toString()
  gV.activeStep = 1;
 

  // Create PaymentIntent as soon as the page loads

  fetchData(totalValue);


}, []);


const appearance = {
  theme: 'flat',
  
  variables: {
   // colorText: 'white',
   // colorBackground: '#0e195a',
   // colorTextPlaceholder: '#727F96',
   // spacingGridRow: '10px',
   
  },
  
};


const options = {
  clientSecret,
  appearance,
}; 


    return (
    
       <>
  
          <div  className="pay-screen">
         
           
  
            
                 
                { <div className="pay-screen-button" onClick={ClosehandleClick}>Cancel</div> }
                  
                   <div className="pay-screen-main"> 
  
                
             {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
            />
          </Elements>
             ) } 
  
         { /* <h1 onClick={PaymentTestClick} className="payment-testoq">PAY</h1> */}
  
  
  
            
            </div>
            </div>   
       </>
       
   
    );
}
 
export default PayScreen;




