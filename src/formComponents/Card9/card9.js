import gV from "../../gV";
import "./card9.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState } from "react";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import { getAuth } from "firebase/auth";
import {doc,setDoc, arrayUnion, getDoc,} from "firebase/firestore";
import { updateDoc, } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import JSZip from "jszip";
import { setGlobalState, useGlobalState } from "../../hookState";

const Card9 = ({display,displayText,buttonText, itemsScrollType,top, totalRecheck,imagingName = null}) => { 



const [arrays, setArray] = useState([]);
const [progress, setProgress] = useState([]);
const [imagesName, setImagesName] = useState([]);
const [isError] = useGlobalState("isError");

const [storageRef, setstorageRef] = useState(null)

const [isShowİllüst, setIsShowİllüst] = useState(true);

const auth = getAuth();
const user = auth.currentUser;
   
const userRef = user ?  doc(db, "VitamuUsersREAL", `${user.email}`) : null;




const getImagesName = async () => {
  
  var imagesData = [];

 await getDoc(userRef).then((docSnap) => {
    if (docSnap.exists()) {
      
       if(totalRecheck === 1){
        imagesData = docSnap.data().FirstRecheck.zipNames;
       }

        if(totalRecheck === 2){
        imagesData = docSnap.data().SecondRecheck.zipNames;
        }

        //Life Long Option
        //..
        if(totalRecheck === 0){
        imagesData = docSnap.data().LifeLong.zipNames;
        }


   
    }

  });



  if(imagesData !== null && imagesData !== undefined ){

    imagesData.map((item, idx) => {
     setImagesName((prevState) => [...prevState, item]);
    });

  }

};



useEffect(() => {

  for (let i = 0; i < 700; i++) {
    setProgress((prevState) => [...prevState, { id: i, value: 0 }]);
    // console.log(progress);
  }

  
  //get images from firestore database and push array to state
}, []);

useEffect(() => {

  getImagesName();
}, []);



const handleImageChange = (e) => {
  setGlobalState("isFormValidate", true);
  
  //  arrays.push(...Array.from(e.target.files));
  arrays.push(...Array.from(e.target.files));
  //  setArray(Array.from(e.target.files));
  //setArray(prevState => [...prevState, ...Array.from(e.target.files)]);

  const zip = new JSZip();

  setIsShowİllüst(false);

  //IMAGELERİ STORAGE YÜKLEME
  arrays.map((item, idx) => {
    const storageRef = ref(
      storage,
      `/${user ? user.email : gV.MailAddres}/${item.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, item);
    
    //Zipping multiple files
    //..
    zip.file(item.name, item, { binary: true });
    gV.imagesName.push(item.name);


    //Set Doc firestore database
    //..
    if(totalRecheck === 1 ){
      setDoc(
        doc(db, "VitamuUsersREAL", `${user.email}`),
        {
          FirstRecheck: { imagesName: arrayUnion(item.name) },
        },
        { merge: true }
      );

    }

    if(totalRecheck === 2 ){
        
        setDoc(
          doc(db, "VitamuUsersREAL", `${user.email}`),
          {
            SecondRecheck: { imagesName: arrayUnion(item.name) },
          },
          { merge: true }
        );
  
    }

    //Life Long Option
    //..
    if(totalRecheck === 0 ){
        
        setDoc(
          doc(db, "VitamuUsersREAL", `${user.email}`),
          {
            LifeLong: { imagesName: arrayUnion(item.name) },
          },
          { merge: true }
        );
  
    }
  

    //FOTİLERİ STORAGE YÜKLEME
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress((prevState) =>
          prevState.map((item) =>
            item.id === idx ? { ...item, progress: progressPercent } : item
          )
        );
        // setArray(arrays.filter((item, index) => index !== idx));
      },

      (error) => {
        console.log(error);
      },
      () => {
        // URLLERİ FİRESTORE DATABASE'E YÜKLEME
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          gV.imagesUrl.push(url);
          gV.isHaveImages = true;


          if(totalRecheck === 1 ){

            setDoc(
              doc(db, "VitamuUsersREAL", `${user.email}`),
              {
                FirstRecheck: {
                  
                  imagesUrl: arrayUnion(url),
                  isHaveImages: true,
                },
              },
              { merge: true }
            );

          }

          if(totalRecheck === 2 ){
              
              setDoc(
                doc(db, "VitamuUsersREAL", `${user.email}`),
                {
                  SecondRecheck: {
                    
                    imagesUrl: arrayUnion(url),
                    isHaveImages: true,
                  },
                },
                { merge: true }
              );  
          }

          //Life Long Option
          //..
          if(totalRecheck === 0 ){
              
              setDoc(
                doc(db, "VitamuUsersREAL", `${user.email}`),
                {
                  
                  LifeLong: {
                    
                    imagesUrl: arrayUnion(url),
                    isHaveImages: true,
                  },
                },
                { merge: true }
              );  
          }

          toast.success("File uploaded successfully", {
            position: "bottom-right",
            autoClose: 400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    );
      
  });



  //Push to Storage & Zipping 
  //..
  zip.generateAsync({ type: "blob" }).then(function (content) {
   
   
     if(totalRecheck === 1 ){

      console.log("run 1")
      const FirstRecheckStorageRef = ref(
        storage,
        `/${user ? user.email : gV.MailAddres}/first_recheck_medical${Date.now()}.zip`
      );

      setDoc(
        doc(db, "VitamuUsersREAL", `${user.email}`),
        {
          FirstRecheck: { zipNames: arrayUnion(`first_recheck_medical${Date.now()}.zip`) },
        },
        { merge: true }
      );


     const uploadImage = uploadBytesResumable(FirstRecheckStorageRef, content);
     
     
     uploadImage.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            gV.zipUrls.push(url);
            user &&
              //update doc push content url to firebase database array
  
              setDoc(
                doc(db, "VitamuUsersREAL", `${user.email}`),
                {
                  FirstRecheck: { zipUrls: arrayUnion(url) },
                },
                { merge: true }
              );
          });
     
        }
      );
      console.log("run 1 end")
    
    }
     
     if(totalRecheck === 2 ){

      console.log("run 2")

        
      const SecondRecheckStorageRef = ref(
        storage,
        `/${user ? user.email : gV.MailAddres}/second_recheck_medical${Date.now()}.zip`
      );

      setDoc(
        doc(db, "VitamuUsersREAL", `${user.email}`),
        {
          SecondRecheck: { zipNames: arrayUnion(`first_recheck_medical${Date.now()}.zip`) },
        },
        { merge: true }
      );
      
   
      const uploadImage2 = uploadBytesResumable(SecondRecheckStorageRef, content);
      uploadImage2.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadImage2.snapshot.ref).then((url) => {
            gV.zipUrls.push(url);
            user &&
              //update doc push content url to firebase database array
  
              setDoc(
                doc(db, "VitamuUsersREAL", `${user.email}`),
                {
                  SecondRecheck: { zipUrls: arrayUnion(url) },
                },
                { merge: true }
              );
          });
     
        }
      );
      console.log("run 2 end")
    
    }
    

     //Life Long Option
     //..  
     if(totalRecheck === 0 ){

        
      const SecondRecheckStorageRef = ref(
        storage,
        `/${user ? user.email : gV.MailAddres}/medical${Date.now()}.zip`
      );

      setDoc(
        doc(db, "VitamuUsersREAL", `${user.email}`),
        {
          LifeLong: { zipNames: arrayUnion(`${imagingName} - Medical Images${Date.now()}.zip`) },
        },
        { merge: true }
      );
      
   
      const uploadImage2 = uploadBytesResumable(SecondRecheckStorageRef, content);
      uploadImage2.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadImage2.snapshot.ref).then((url) => {
            gV.zipUrls.push(url);
            user &&
              //update doc push content url to firebase database array
  
              setDoc(
                doc(db, "VitamuUsersREAL", `${user.email}`),
                {
                  LifeLong: { zipUrls: arrayUnion(url) },
                },
                { merge: true }
              );
          });
     
        }
      );
      console.log("run 2 end")
    
    }
    
  
  
  });


};



return (
      <>

      <ToastContainer/>
        {
       
         (
          <div className="card9" style={{ position:"relative", display: display, top: top  }}>
            <div className="card9-main">
              <div className="card9-main-texts">
                <p style={{display: displayText, float:"top"}} >
                  Alright then, here is where{" "}
                  <span> you can upload your  {gV.showAppliesText.toString()}.</span> 
                </p>
                <p style={{display: displayText}} >
                Please put all the files (images, reports, and other  content) you have into a new folder, then upload the folder below.
                </p>
  

           <div> 


                 {
                 //control imagesName array is empty or not
                  imagesName.length > 0 || !isShowİllüst ? null : 
                  
                  
                    <div className="card9-noimage-area ">
                      <img  src="https://i.ibb.co/C0Vchj1/ill-st.png"/>
                      <p style={{color:"#142b6f"}}>There is nothing here.</p>
                    </div>
                 }

             
              
              

                {arrays.map((item, idx) => (
                  <div className="card9-main-texts-image-name" key={idx}>
                    {" "}
                   <p style={{fontSize:"13px"}}> {item.name} ({progress[idx].progress}%)</p>
                   
                   <svg style={{cursor: "pointer"}} onClick={  ()=>{

                      /*delete images function */
                       setArray(arrays.filter((item, index) => index !== idx));

                       //delete images from storage
                        const storageRef = ref(storage, `/${user ? user.email : gV.MailAddres }/${item.name}`);
                         deleteObject(storageRef);

                       //delete images Url from firestore database
                       updateDoc(userRef, {
                        imagesName: arrayRemove(item.name),
                        });
                  

                      toast.success('Delete image successfully.', {
                        position: "bottom-right",
                        autoClose: 700,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        }).catch(error => {
                          console.log(error);
                        });
                   }} className="svg-images" stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                 
                  </div>
                ))}

                {imagesName.map((item, idx) => (
                  <div style={{backgroundColor:"#0b090910"}} className="card9-main-texts-image-name" key={idx}>
                    {" "}
                   <p style={{fontSize:"13px"}}> {item}</p>
                   
                   <svg style={{cursor: "pointer"}} onClick={ ()=>{

                      /*delete images function */
                       setImagesName(imagesName.filter((item, index) => index !== idx));

                       //delete images from storage
                        const storageRef = ref(storage, `/${user ? user.email : gV.MailAddres }/${item}`);
                         deleteObject(storageRef);

                         //delete images URL from firestore database iamgesUrl array which select user item
                          updateDoc(userRef, {
                          imagesName: arrayRemove(item),
                          });
                      
              

                      toast.success('Delete image successfully.', {
                        position: "bottom-right",
                        autoClose: 700,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        }).catch(error => {
                          console.log(error);
                        });
                   }} className="svg-images" stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                 
                  </div>
                ))}

          </div>

        
                
                <input
                  
                  directory=""
                  webkitdirectory=""
                  
                  multiple="multiple"
                  className="card9-main-texts-input"
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                  id='input' 
                  // onClick={(e) => (gV.p = 7)}
                />
                <label htmlFor="file" className="card9-main-texts-button">
                  {" "}
                  {buttonText}
                </label>
          
            <p style={{position:"relative", bottom:"7vh"}} className= {isError ? "is-error-text" : "display-none" }> This question is required</p>
             
              </div>
             
            </div>
          
          </div>
        )}
      </>
    );
}

export default Card9;