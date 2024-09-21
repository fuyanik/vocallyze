import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";


import "../style/userPanel.css"
import { getAuth } from "firebase/auth";
import { MdExpandMore } from "react-icons/md";

import { db } from "../../../firebase";
import { saveAs } from 'file-saver'
import { doc } from "firebase/firestore";

import { useState,useEffect } from "react";

import { getDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import {deleteField } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card9 from "../../../formComponents/Card9/card9";
import gV from "../../../gV";
import { deleteObject } from "firebase/storage";
import { storage } from "../../../firebase";
import { setDoc } from "firebase/firestore";
//açılan pencerenin içi ve bottom çizgiler
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  
 
  
  "&:not(:last-child)": {
    borderBottom: " 1px solid rgba(128, 128, 128, 0.31)"
  },

  "&:before": {
    display: "inline"
  }
}));

// yandaki iconlar
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      
     <MdExpandMore className="panel-accordion-icon"
    
     
     />
    }

    {...props}
  />

  //İÇ GENEL
))(({ theme }) => ({
  
  paddingRight: "0px",
  backgroundColor: "",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)"
  },
  "& .MuiAccordionSummary-content": {
   
    marginLeft: theme.spacing(3),
  
  }
}));

//iç METİN
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: "1px",

  
}));


export default function CustomizedAccordions({totalRecheck}) {

  const auth = getAuth();
  const user = auth.currentUser;

  const [expanded, setExpanded] = React.useState("panel1");
  const [showAppliesText, setShowAppliesText] = useState("");


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



 
 // 

 const docRef = doc(db, "Medifyre", `${user.email}`);

 //get data firestore database 

  const [recheksData, setRecheksData] = useState([]);

 const getInfo = async () => {

  const docRef = doc(db, "Medifyre", `${user.email}`);
  await getDoc(docRef).then((doc) => {
    if (doc.exists()) { 
      console.log("Current data: ", doc.data());

      setRecheksData(doc.data().Rechecks);
      console.log(doc.data().Rechecks);

    }}).catch((error) => {});
 };




 useEffect(() => {
  getInfo();
  return () => {
    
  }
 },[])


 const returnAccordionMonth = () => {


  if(recheksData[0].createMonth === 0){
    return "January"
  }
  if(recheksData[0].createMonth === 1){
    return "February"
  }
  if(recheksData[0].createMonth === 2){
    return "March"
  }
  if(recheksData[0].createMonth === 3){
    return "April"
  }
  if(recheksData[0].createMonth === 4){
    return "May"
  }
  if(recheksData[0].createMonth === 5){
    return "June"
  }
  if(recheksData[0].createMonth === 6){
    return "July"
  }
  if(recheksData[0].createMonth === 7){
    return "August"
  }
  if(recheksData[0].createMonth === 8){
    return "September"
  }
  if(recheksData[0].createMonth === 9 ){
    return "October"
  }
  if(recheksData[0].createMonth === 10 ){
    return "November"
  }
  if(recheksData[0].createMonth === 11 ){
    return "December"
  }

  
 }



  const [zipUrls, setZipUrls] = useState([]);

  const getZipUrls = async () => {

   await getDoc(docRef).then((docSnap) => {

    if(totalRecheck == 1){

      var zipAllImages = docSnap.data().FirstRecheck.zipUrls
      if(zipAllImages != null){
       zipAllImages.map((item) => {
         setZipUrls((prevState) => [...prevState, item]);
      })}
     
     
     setShowAppliesText(docSnap.data().FirstRecheck.ShowAppliesText);

    }

    if(totalRecheck == 2){

      var zipAllImages = docSnap.data().SecondRecheck.zipUrls
      if(zipAllImages != null){
       zipAllImages.map((item) => {
         setZipUrls((prevState) => [...prevState, item]);
      })}
     
     
     setShowAppliesText(docSnap.data().SecondRecheck.ShowAppliesText);



    }
      

     
        
       
      
    });

  
  }
  useEffect(  () => {
    getZipUrls();
    
  }, []);

  // download image from firebase storage
  const pullImages = () => {
    
    if (zipUrls != null) {
     // saveAs(zipUrl, "mammogram.jpg");
      zipUrls.map((url) => {
        saveAs(url, "mammogram.jpg");
      
      }).then((e) => {
        toast.success("Download All Images successfully.", {
          position: "bottom-right",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })

    } else {
      toast.error("You have no images to download.", {
        position: "bottom-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
 
  };

  //delete image from firebase storage
   const deleteImages = () => {

    gV.isHaveImages = false;
    //Remove data from database
    //..

    if(totalRecheck == 1){
      setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
        FirstRecheck: {
          isHaveImages: false,
          imagesUrl: deleteField(),
          imagesName: deleteField(),
          zipUrls: deleteField(),
          zipNames: deleteField(),
        
        }, 
      },
      {merge: true}
     )
        .then((e) => {
          toast.success("Delete All Images successfully.", {
            position: "bottom-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      //Remove data from storage
      //...
  
    }

    if(totalRecheck == 2){
      setDoc(doc(db, "VitamuUsersREAL", `${user.email}`), {
        SecondRecheck: {
          isHaveImages: false,
          imagesUrl: deleteField(),
          imagesName: deleteField(),
          zipUrls: deleteField(),
          zipNames: deleteField(),
        
        }, 
      },
      {merge: true}
     )
        .then((e) => {
          toast.success("Delete All Images successfully.", {
            position: "bottom-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      //Remove data from storage
      //...
    }

  
    const imageRef = ref(
      storage,
      `/${user ? user.email : gV.MailAddres}`
    );
    deleteObject(imageRef)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="accordion-reckeck-anim">
      {/* ACCORDİON 1 */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
        
        aria-controls="panel1d-content" id="panel1d-header">

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              left: `${gV.mq.matches ? "-6%" :"-0.5%" }`,
              width: "20%",
              
             
            }}
          >
           <div className="flex lg:gap-4 gap-2 lg:text-normal lg:text-[14px] text-[12px]">
           { recheksData[0] &&  recheksData[0].scanType.map((item) => ( 
            <p className="text-white bg-sec  whitespace-nowrap   font-normal font-product px-3 py-1 rounded-full relative lg:bottom-1"> {item}</p>
            ))  }
             <div className=" flex gap-2 relative lg:bottom-1">
              { recheksData[0] &&  recheksData[0].bodyParts.map((item) => ( 
            
               
                 <p className="text-white bg-black font-normal  whitespace-nowrap  font-product px-3 py-1 rounded-full"> {item}</p>
                  
              ))  }
              </div>



            
           </div>

             
             

          </div>
        </AccordionSummary>

        <AccordionDetails>
         <div className="flex flex-col lg:gap-6 gap-8">
           <div className="accordion-upload-image">
             <Card9
               totalRecheck={totalRecheck}
               itemsScrollType={""}
               top={"2vh"}
               displayText={"none"}
               buttonText={"Upload Image"}
               userMailAddress={user.email}
             />
           </div>
          
           <div className="accordion-details2">
             <div onClick={pullImages}>Download All</div>
          
             <div onClick={deleteImages}>Delete</div>
           </div>
         </div>
        </AccordionDetails>
      </Accordion>

      <ToastContainer />
    </div>
  );
}

