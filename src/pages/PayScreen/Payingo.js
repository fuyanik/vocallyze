
import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, arrayUnion, updateDoc   } from "firebase/firestore"; 
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';



const Payingo = () => {
    const auth = getAuth();
    const user =  auth.currentUser;

    const [count, setCount] = useState(9);

 
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