
import React, { useRef } from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, arrayUnion, updateDoc   } from "firebase/firestore"; 
import { db } from '../../firebase';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import './style/paySucces.css'
import lottie from 'lottie-web';

const Payingo = () => {
  

    const logo = useRef(null)
    useEffect(() => {
     
      lottie.loadAnimation({
       container: logo.current,
       renderer: 'svg',
       loop: false,
       autoplay: true,
       animationData: require('./assets/anim2.json')
     })
     return () => { lottie.destroy() }
   },[])


   const auth = getAuth();
   const user =  auth.currentUser;


    const [count, setCount] = useState(6);



    const signInWithParams =  () => {
      
      const searchParams = new URLSearchParams(window.location.search);
      const email = searchParams.get('email');
      const pass = searchParams.get('pass');
 
     if (email && pass) {
       console.log('Mail:', email);
       console.log('Pass:', pass);
     }
     else {
     
     }
  

    

      setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        
      
      
        return signInWithEmailAndPassword(auth, email, pass );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage)
      });

    }

 
    const updatePay = async ()  => {
  
      const auth = getAuth();
      const user =  auth.currentUser;
  
       if (user) {
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
  
  
        }
  
  
         //Control user is have images or not for detect active step
         //...
         returnRecheckNumber();
     
  
        } 
  
        else {
         console.log("NO USER");
     
        }
  
    }
   
  
     
    
    useEffect(() => {

      signInWithParams();
      updatePay();
  
  
      const interval = setInterval(() => {
        updatePay();
        setCount(count - 1);
      }, 1000);
     
  
      return () => clearInterval(interval);
    }, [count]);
  

    let navigate = useNavigate();
  
    setTimeout(() => {
    // user ?  navigate("/user-panel")  :  navigate("/login") 
   }, 5000);

  


  return (
    <>
    
      
    <div className='pay-succes bg-sec'> 
            <p className='pay-succes__text'>Checkout</p>
            <p className='pay-succes__text2'>Thanks!</p>
            <p className='pay-succes__text3 relative bottom-8'>{count}</p>
       

        <div className='pay-succes__bottom'>
            <div className='pay-succes__bottom__animation' ref={logo} ></div>
            <p className='pay-succes__bottom__text'>We got your recheck request and payment.</p>
            <p className='pay-succes__bottom__text2'>You are now being directed to your user portal.</p>
        </div>

              
              
             
      
    </div>
    
    </>
  )
}

export default Payingo