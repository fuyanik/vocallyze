
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getStorage} from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeAnalytics } from 'firebase/analytics';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr-WyxIuoEsX_e5LEa1r8AvJ1cskRdFI0",
  authDomain: "medifyre-1b1bc.firebaseapp.com",
  projectId: "medifyre-1b1bc",
  storageBucket: "medifyre-1b1bc.appspot.com",
  messagingSenderId: "1055498225865",
  appId: "1:1055498225865:web:884d61aaa60e3bd677a518",
  measurementId: "G-ZGF1X3RF7N"
};


 
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebaseApp.firestore();
  export const storage = getStorage(firebaseApp);
  export const auth = getAuth(firebaseApp);

  
  export const analytics = getAnalytics(firebaseApp);
  
 
 
/*

const checkoutButton = document.getElementById("checkout-button");
const createStripeCheckoutSession = firebase.functions().httpsCallable("createStripeCheckoutSession");
const stripe =  Stripe("pk_test_51Iq2y9J2Q9q3PvK8W7JN6Y0U6gY5J1V0a8fZQkV7Q5gJh5V7i8Xy9M9Xj1ZvD3p7F8Z3w3qkq3QvQ2W7g8y9R1Xf00eYj2Qg7s");

checkoutButton.addEventListener("click", 
 () => {
  createStripeCheckoutSession().then((response) => {
  
    const sessionId = response.data.id
    stripe.redirectToCheckout({sessionId: sessionId })
  
  });
  
});
*/

/* const Testo = async () => { 

  const createStripeCheckout = firebase.functions().httpsCallable("createStripeCheckout");
  const { id } = await createStripeCheckout();
  const stripe = await Stripe("pk_test_51Iq2y9J2Q9q3PvK8W7JN6Y0U6gY5J1V0a8fZQkV7Q5gJh5V7i8Xy9M9Xj1ZvD3p7F8Z3w3qkq3QvQ2W7g8y9R1Xf00eYj2Qg7s");
  stripe.redirectToCheckout({ sessionId: id });

}

 Testo(); */