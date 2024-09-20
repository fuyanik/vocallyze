import { getAuth } from 'firebase/auth';
import { arrayUnion, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase';

const ChatScreen = () => {

   const auth = getAuth();
   const user = auth.currentUser;

   const [loading, setLoading] = useState(true);
   const [liveMessages, setLiveMessages] = useState([]);
   const [currentMessage, setCurrentMessage] = useState("");

   const [data, setData ] = useState(null); // [

  

   //Get the user from the  firestore database
   //...

   useEffect(() => {
        
      try { 
       onSnapshot(doc(db, "VitamuUsersREAL", `${user.email}`), (doc) => {

         if (!doc.exists()) {
             console.log("No such document!");
         } else {

            setData(doc.data());

            console.log("Current data: ", doc.data().ChatMessages);
            setLiveMessages(doc.data().ChatMessages);
     
         }
        
     });
  
       } catch (error) {
         console.log(error);
       }
    }, [] );


    const sendMessage = () => {


      if(currentMessage == "") return;
      
      //Send the message to the firestore database
      //...

      if(data.isAskQuestion) {

         setDoc(
            doc(db, "VitamuUsersREAL", `${user.email}`),
            {      
                
                  isAskQuestion: true,
                  ChatMessages: arrayUnion({
                  message: currentMessage,
                  isAdmin: false,
                }),
          
            },
            { merge: true }
          );  

      }

      else {
         setDoc(
            doc(db, "VitamuUsersREAL", `${user.email}`),
            {      
               Questions: {
                  questions: arrayUnion({
                    allDate: new Date(),
                    createDay: new Date().getDate(),
                    createMonth: new Date().getMonth(),
                    createYear: new Date().getFullYear(),
                    createdAt: Timestamp.now().toDate(),
                    name: user.displayName,
                    email: user.email,
                    isImage: false,
                    question: currentMessage,
                  }),
                  
                },
                  isAskQuestion: true,
                  ChatMessages: arrayUnion({
                  message: currentMessage,
                  isAdmin: false,
                }),
          
            },
            { merge: true }
          );  
      }

      

   


       setCurrentMessage("");

    }




    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {

         sendMessage();
      
      }
    }


  return (

    <div className=' font-product tracking-wide lg:w-[69vw] w-screen    px-2 '>

     


<div class="flex-1 p:2 sm:px-7  justify-between flex flex-col h-[58vh] lg:h-[60vh]">
   <div class="flex sm:items-center px-2 pb-3 shadow-md rounded-md justify-between py-0 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
         <div class="relative">
           
         <img src="" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
         </div>
         <div class="flex flex-col leading-tight">
            <div class="text-lg mt-1 flex items-center">
               <span class="text-gray-700 mr-3">Dr. Samuel Reed</span>
            </div>
            <span class="text-md text-gray-600">
            Diagnostic Radiology</span>
         </div>
      </div>

     
   </div>
  
  
   <div id="messages" class="flex flex-col pt-10 h-full space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
   
   
      {

      liveMessages &&
      
      liveMessages.map((message) => (
           <div class="chat-message">
           <div class={` ${message.isAdmin ?  "flex items-end" : " flex items-end justify-end" } `} >
              <div class={` ${message.isAdmin ?  "flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start" : " text-sm flex flex-col space-y-2  max-w-xs mx-2 order-1 items-end" } `} >
                 <div ><span class={` ${message.isAdmin ?  "px-4 py-2 rounded-2xl inline-block bg-gray-300 text-gray-600 " : " px-4 py-2 rounded-2xl inline-block rounded-br-none bg-[#000000] text-white" } `}>{message.message}</span>   </div>
              </div>
           </div>
        </div>
      ))}
    
    
    
   
   
   </div>
  
   <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
         
       
         <input onKeyPress={handleKeyPress} value={currentMessage} onChange={ (e)=>{ setCurrentMessage(e.target.value)} } type="text" placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-3xl py-3"/>
        
         <div class="absolute right-0 items-center inset-y-0  sm:flex">
           
            <button type="button" class="sm:flex hidden items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
               </svg>
            </button>
           
         
           
            <button class="inline-flex items-center justify-center rounded-3xl px-6 py-2 mt-[2px] lg:mt-0 transition duration-500 ease-in-out text-white bg-[#000000] hover:bg-[#00000093] focus:outline-none" onClick={() =>{ sendMessage(); setCurrentMessage("")}} type="button" >
               <span class="font-bold">Send</span>
               <span  className="primary-button__arrow ml-3">➔</span>
               
            </button>
        
         </div>
   
      </div>
   </div>
</div>




    </div>
 
    )
}

export default ChatScreen;