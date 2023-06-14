import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { arrayUnion, doc, setDoc, Timestamp } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../../firebase";
import Navbar from "../../homeComponents/1.Navbar/navbar";
import { SideInformation } from "../BiRads/biRads3";

const AskRadiologist = () => {
  
    const auth = getAuth();
    const user = auth.currentUser;


    const navigate = useNavigate();

    //Help us to change the text in the header
    //..
    const [count, setCount] = useState(0);
   
    //Form states
    //..
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [question, setQuestion] = useState("");

    //Yes or No ui states
    //..
    const [left, setLeft] = useState("left-[1%]")

    //Submit button state
    //..
    const [isSubmit, setIsSubmit] = useState(false);
    

    useEffect(() => {
      
      const interval = setInterval(() => {
       
        setCount(count + 1);
        if(count == 5){
          setCount(0)
        }
      }, 2000);
     
  
      return () => clearInterval(interval);
    }, [count]);



    //Sing up user
    //...
    const handleSignup = async  () => {

      try {

        

        

        await createUserWithEmailAndPassword(auth, email, "slayerfurkan").then((userCredential) => {
          // Signed in 
           
          setDoc(
            doc(db, "VitamuUsersREAL", `${email}`),
            {
              isAskQuestion: true,
              ChatMessages: arrayUnion({
                message: question,
                isAdmin: false,
              }),
              Questions: {
                questions: arrayUnion({
                  allDate: new Date(),
                  createDay: new Date().getDate(),
                  createMonth: new Date().getMonth(),
                  createYear: new Date().getFullYear(),
                  createdAt: Timestamp.now().toDate(),
                  name: name,
                  email: email,
                  isImage: isImage,
                  question: question,
                }),
                
              },
          
          
            },
            { merge: true }
          );  

        }).then(() => {

          updateProfile(auth.currentUser, { displayName: name }).then(() => {
            // Profile updated!
            // ...
           
            window.location.href = "/user-panel";
            navigate("/user-panel");
           
  
          });


          // ...
          console.log("set doc")
        });

        

        

       
      } catch (error) {
    
        if (error.code === 'auth/email-already-in-use') {
          console.log("SIGN UP ERROR")
         return;
        
        }
        if (error.code === 'auth/invalid-email') {
        
         console.log("SIGN UP ERROR")
         return;
        
        }


    }
  };


    //Submit button function
    //..
    const handleSubmit = (e) => {

       if(name == "" || question == "" || email == ""){

        toast.error("Please complete all fields.", {}  );


      
    } 
       else{

        e.preventDefault();
        setIsSubmit(true);

        handleSignup();

    }

    }



  return (
    <>
     <Navbar
      mobileMenuText={'Menu'}
      mobileMenuTo ={"/mobileNavMenu"}
      />

      <div className="font-product w-screen flex gap-10 bg-slate-50 h-auto lg:px-32 px-4 lg:py-14 py-6 text-[#142b6f]">
      
        <div className="flex flex-col gap-6 lg:mt-10 mt-16 ">
     
          <div className="dropdown-page-header__yellow">
            <div className="flex gap-1">
              <p> We recheck </p>
              {count == 0 && <p>mammograms.</p>}
              {count == 1 && <p>ultrasounds.</p>}
              {count == 2 && <p>breast MRIs</p>}
              {count == 3 && <p>mammograms.</p>}
              {count == 4 && <p>ultrasounds.</p>}
              {count == 5 && <p>breast MRIs.</p>}
            </div>
          </div>
      
          <div className="dropdown-page-header__title">
            <h1> Any questions? We have answers. </h1>
          </div>
      
       <div className="flex flex-col gap-5 text-[17px]">
           <p className="lg:w-[72%]  w-[90vw]">
           Every woman has a unique breast cancer screening experience, and the results are often vague and confusing. You got your breast screening for peace of mind, but now you have many questions.  Whether it was a Birads 2 result from your ultrasound or breast cancer diagnosis, we will answer all your questions for free.
           </p>
           <p className="lg:w-[72%]  w-[90vw]">
           Ask your questions here and get an answer from a U.S. board-certified radiologist in 24 hours.
           </p>
       </div>


      
          {/* Name */}
          <div className="flex flex-col gap-3">
            <p className="text-[17px] text-[#142b6f] font-bold mt-4">
              {" "}
              What is your name?
            </p>
            <textarea
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 pt-1  rounded-2xl border-2 border-dotted border-[#142b6f] px-4 outline-none"
              placeholder=""
            />
          </div>
      
          {/* Question */}
          <div className="flex flex-col gap-3">
            <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[65%] w-[96%]">
              Please be as specific as possible. You will get a response from your
              dedicated radiologist in 24 hours.
            </p>
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              type="text"
              className="w-[96%] lg:w-[65%] lg:h-[24vh] h-[16vh] pt-2  rounded-2xl border-2 border-dotted border-[#142b6f] px-4 outline-none"
              placeholder="Type your question here."
            />
          </div>
      
          {/* Breast Screen Last 3 Month */}
          <div className="flex flex-col gap-3">
            <p className="text-[17px] text-[#142b6f] font-bold mt-4 lg:w-[55%] w-[96%]">
              Did you have a breast screening in last 3 monts?
            </p>
      
            <div className=" lg:w-[16vw] w-[80vw] h-[7vh] lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer">
              <div
                className={`absolute ${left}  w-[48%] h-[90%] bg-teal-200 rounded-2xl duration-300 ease-in-out z-0`}
              >
                {" "}
              </div>
      
              <p
                onClick={() => {
                  setIsImage(true);
                  setLeft("left-[1%]");
                }}
                className="h-[96%] w-[50%] flex items-center justify-center rounded-2xl z-10 duration-200 ease-in-out "
              >
                Yes
              </p>
              <p
                onClick={() => {
                  setIsImage(false);
                  setLeft("left-[50%]");
                }}
                className="h-[96%] w-[50%] flex items-center justify-center rounded-2xl z-10 duration-300 ease-in-out "
              >
                No
              </p>
            </div>
          </div>
      
          {/* Email */}
          <div className="flex flex-col gap-3">
            <p className="text-[17px] text-[#142b6f] font-bold mt-4">
              {" "}
              To see the answers in your user portal, please enter your e-mail
              address.
            </p>
            <textarea
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              className="w-[96%] lg:w-[40%] h-[6vh] lg:pt-2 pt-1  rounded-2xl border-2 border-dotted border-[#142b6f] px-4 outline-none"
              placeholder=""
            />
          </div>
      
          <div>
            <button
              onClick={handleSubmit}
              className={` ${
                isSubmit ? "bg-[#142b6fbf]" : "bg-[#142b6f]"
              } shadow-2xl text-[17px] text-white w-[55%] lg:w-[35%] hover:bg-[#142b6fe7] duration-500 h-[6vh] rounded-3xl flex items-center justify-center`}
            >
              {isSubmit ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-[#142b6f]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                "Submit Question "
              )}
            </button>
          </div>
        </div>

        <div className="w-auto">
          <SideInformation/>
        </div>

        
      
        <ToastContainer />
      
      </div>
    </>
  );
};

export default AskRadiologist;
