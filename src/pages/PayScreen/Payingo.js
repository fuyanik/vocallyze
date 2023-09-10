
import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, arrayUnion, updateDoc   } from "firebase/firestore"; 
import { db } from '../../firebase';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';



const Payingo = () => {
    const auth = getAuth();
    const user =  auth.currentUser;

  // Local storage'dan veri almak için bir fonksiyon
  const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};






    const [count, setCount] = useState(9);



    const signInWithLocalStorage =  () => {
      const storedMailAddress = getFromLocalStorage("mailAddress");
      const storedPass = getFromLocalStorage("pass");
  
      console.log(storedMailAddress);
      console.log(storedPass);

      setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        
      
      
        return signInWithEmailAndPassword(auth, storedMailAddress, storedPass );
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
      
      signInWithLocalStorage();
      updatePay();
  
  
      const interval = setInterval(() => {
        updatePay();
        setCount(count - 1);
      }, 1000);
     
  
      return () => clearInterval(interval);
    }, [count]);
  

    let navigate = useNavigate();
  
    setTimeout(() => {
    user &&   navigate("/user-panel")  
   }, 9000);

  


  return (
    <div>PAY SUCCESSS</div>
  )
}

export default Payingo