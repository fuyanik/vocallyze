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



const auth = getAuth();
const user = auth.currentUser;
   
const userRef = user ?  doc(db, "Medifyre", `${user.email}`) : doc(db, "Medifyre", `${localStorage.getItem("mailAddress")}`)  




const getImagesName = async () => {
  try {
    // Kullanıcının referansından dökümanı al
    const docSnap = await getDoc(userRef);

    // Eğer döküman mevcutsa, veriyi al
    if (docSnap.exists()) {
      const imagesData = docSnap.data()?.FirstRecheck?.imagesName;

      // imagesData kontrolü yap
      if (imagesData && Array.isArray(imagesData)) {
        imagesData.forEach((item) => {
          // Durumu güncelle
          setImagesName((prevState) => [...prevState, item]);
        });
      } else {
        console.log("imagesData verisi boş veya geçersiz.");
      }
    } else {
      console.log("Döküman bulunamadı.");
    }
  } catch (error) {
    console.error("Veri alınırken bir hata oluştu:", error);
  }
};




useEffect(() => {

  for (let i = 0; i < 999; i++) {
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



  //IMAGELERİ STORAGE YÜKLEME
  arrays.map((item, idx) => {
    const storageRef = ref(
      storage,
      `/${user ? user.email : localStorage.getItem("mailAddress") }/${idx}`
    );
    const uploadImage = uploadBytesResumable(storageRef, item);
    
    //Zipping multiple files
    //..
    zip.file(idx, item, { binary: true });

    gV.imagesName.push(item.name);


    //Set Doc firestore database
    //..
   
      setDoc(
        doc(db, "Medifyre", localStorage.getItem("mailAddress")),
        {
          FirstRecheck: { imagesName: arrayUnion(item.name) },
        },
        { merge: true }
      );
 
  

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


        

            setDoc(
              doc(db, "Medifyre", localStorage.getItem("mailAddress")),
              {
                FirstRecheck: {
                  
                  imagesUrl: arrayUnion(url),
                  isHaveImages: true,
                },
              },
              { merge: true }
            );


        
      
        });
      }
    );
      
  });



  //Push to Storage & Zipping 
  //..
  zip.generateAsync({ type: "blob" }).then(function (content) {
   

      console.log("run 1")

      const FirstRecheckStorageRef = ref(
        storage,
        `/${user ? user.email : localStorage.getItem("mailAddress")}/first_recheck_medical${Date.now()}.zip`
      );
 // test
 
      setDoc(
        doc(db, "Medifyre", localStorage.getItem("mailAddress")  ) ,
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
                doc(db, "Medifyre", localStorage.getItem("mailAddress")    ),
                {
                  FirstRecheck: { zipUrls: arrayUnion(url) },
                },
                { merge: true }
              ).then(() => { alert("All files uploaded successfully")});
          });
     
        }
      );
     
     
    
   
     
  
  
  
  });


};



return (
      <>

      <ToastContainer/>
        {
       
         (
            

            <div className="  "> 
              

             <div className="flex relative items-center   text-pri" >
             
                <div htmlFor="file" className="  flex self-center absolute items-center gap-3  bg-white w-fit pl-3 pr-4 py-2 rounded-3xl shadow-2xl">
                   
                   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="28" className='upload-icon-color'><path d="M16 16L12 12L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6902 21.9435 10.7355 21.0667 10.0535C20.1899 9.3714 19.1109 9.00075 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74235 15.09 5.82101C14.3067 4.89967 13.3249 4.16786 12.2181 3.68062C11.1114 3.19338 9.90856 2.96337 8.70012 3.0079C7.49169 3.05242 6.30907 3.37031 5.24118 3.93768C4.17329 4.50505 3.24792 5.30712 2.53463 6.2836C1.82134 7.26008 1.3387 8.38555 1.12299 9.57541C0.907276 10.7653 0.964111 11.9885 1.28922 13.1533C1.61433 14.318 2.19925 15.3939 3.00001 16.3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 16L12 12L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                   <p> {buttonText} </p> 
                   
                 </div> 
               
               <input
               
                   multiple="multiple"
                   type="file"
                   name="image"
                   onChange={(e) => handleImageChange(e)}
                   className="absolute opacity-0 cursor-pointer w-full bottom-20 z-0 "
                   // onClick={(e) => (gV.p = 7)}
                 />
                
             </div>

             <div className="flex w-full px-5 flex-col gap-2 items-center mt-3 lg:w-[90%] max-h-[30vh] overflow-scroll justify-center border-3 border-red-400">
                  {arrays.length > 0 &&
                    arrays.map((item, idx) => (
                      <div className={`flex items-center justify-between px-5 py-3 gap-2 animate-fadeIn  ${progress[idx].progress == 100 ? "bg-green-100" : " bg-slate-50"} shadow-xl rounded-xl w-full`} >
                        
                        <div className="flex items-center gap-2  w-full">
                          <img   width="35"  height="28"  src="https://img.icons8.com/cute-clipart/128/file.png"   alt="file"  />
                          
                         
                          <div className="flex w-full flex-wrap gap-1   justify-center">
                        
                            <div className="w-full flex  items-center justify-between">
                              <p className="text-sm text-start text-[#343434]">{item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name} </p> 
                              <p className="text-[11px] text-[#692525]">({progress[idx].progress }%) </p> 
                            </div>
                         
                             <progress  className="w-full animate-fadeIn " value={progress[idx].progress} max="100" />
                          
                           {/* <div className="text-sm text-[#692525]">({progress[idx].progress}%) </div> */ }
                            
                          </div>
                      
                        </div>

                       { progress[idx].progress !== 100 ? <div
                          class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-800 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div> : <div className="h-4 w-4"> </div>  }

                      </div>
                    ))}


               {imagesName.map((item, idx) => (
                  <div className={`flex items-center justify-between px-5 py-3 gap-2 animate-fadeIn  ${100 == 100 ? "bg-green-100" : " bg-slate-50"} shadow-xl rounded-xl w-full`} >
                        
                  <div className="flex items-center gap-2  w-full">
                    <img   width="35"  height="28"  src="https://img.icons8.com/cute-clipart/128/file.png"   alt="file"  />
                    
                   
                    <div className="flex w-full flex-wrap gap-1   justify-center">
                  
                      <div className="w-full flex  items-center justify-between">
                        <p className="text-sm text-start text-[#343434]">{item.length > 25 ? `${item.substring(0, 25)}...` : item} </p> 
                        <p className="text-[11px] text-[#692525]">({100}%) </p> 
                      </div>
                   
                       <progress  className="w-full animate-fadeIn " value={100} max="100" />
                    
                     {/* <div className="text-sm text-[#692525]">({progress[idx].progress}%) </div> */ }
                      
                    </div>
                
                  </div>

                 { 100 !== 100 ? <div
                    class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-800 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div> : <div className="h-4 w-4"> </div>  }

                </div>
                 ))}
            
            
                </div>
              
              


           </div>

        
                
              
          
             
         
             
          
         
        )}
      </>
    );
}

export default Card9;