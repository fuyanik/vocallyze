import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc   } from "firebase/firestore"; 
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { deleteDoc } from 'firebase/firestore';
import { useRef } from 'react';
import lottie from 'lottie-web';
import './style/paySucces.css'
import { getAnalytics, logEvent } from "firebase/analytics";
import gtag from 'ga-gtag';



const PaySucces = () => {




  const logo = useRef(null)
  const [count, setCount] = useState(8);

  const auth = getAuth();
  const user =  auth.currentUser;
  
 
  const updatePay = async ()  => {

     if (user) {
       //fetch firebase data firestore
       const userRef = doc(db, "VitamuUsersREAL", `${user.email}`);
       const docSnap = await getDoc(userRef);
       const data = docSnap.data();

       console.log(data)

       const returnRecheckNumber = async () => {

        if(data.TotalRechecks === 1 && data.FirstRecheck.isHaveImages === true){
          await setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
            FirstRecheck: {isPay: true, activeStep: 3}, 
          },
          {merge: true}
         );
        }

        if(data.TotalRechecks === 1 && data.FirstRecheck.isHaveImages === false){

          await setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
            FirstRecheck: {isPay: true, activeStep: 2}, 
          },
          {merge: true}
         );
       
        }

        if(data.TotalRechecks === 2 && data.SecondRecheck.isHaveImages === true){
          await setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
            SecondRecheck: {isPay: true, activeStep: 3}, 
          },
          {merge: true}
         );
        }

        if(data.TotalRechecks === 2 && data.SecondRecheck.isHaveImages === false){
          await setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
            SecondRecheck: {isPay: true, activeStep: 2}, 
          },
          {merge: true}
         );
        }
      
        await deleteDoc(doc(db, "Unfinished Users", `${user.email}`));
        
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

  const analytics = getAnalytics();


  logEvent(analytics, 'pay_succes', {
    content_type: "text",
    content_id: 'P11123'
  });

  console.log("run analytics")

  gtag('event', 'conversion', {'send_to': 'AW-123456789/abcdefghijk'});


  
  //add conversion event to analytics 
  /*
  console.log("conversion event")
  firebase.analytics().logEvent('conversion', {
    currency: 'USD',
    value: 1.00,
    transaction_id: '1234567890',
  }) */

  /*add conversion event to analytics  2
  console.log("conversion event2")
  firebase.analytics().logEvent('conversionn', {
   
  }) */


 },[])
   
  
  useEffect(() => {

        
    updatePay();
    const interval = setInterval(() => {
      updatePay();
      setCount(count - 1);
    }, 1000);
   

    return () => clearInterval(interval);
  }, [count]);


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

  
  let navigate = useNavigate();
  
     setTimeout(() => {
    user ?  navigate("/user-panel") : navigate("/pay-succes") 
    }, 8000);

  return (
    
    <>
    
      
    <div className='pay-succes'> 
           <p className='pay-succes__text'>Checkout</p>
           <p className='pay-succes__text2'>Thanks!</p>
            <p className='pay-succes__text3'>{count}</p>
       

        <div className='pay-succes__bottom'>
            <div className='pay-succes__bottom__animation' ref={logo} ></div>
            <p className='pay-succes__bottom__text'>We got your recheck request and payment.</p>
            <p className='pay-succes__bottom__text2'>You are now being directed to your user portal.</p>
        </div>

              
              
             
      
    </div>
    
    </>
  )
}

export default PaySucces