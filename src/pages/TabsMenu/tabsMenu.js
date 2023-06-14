import React, { useEffect } from 'react'
import { useState } from 'react'
import './style/tabsMenu.css'
import { setGlobalState } from '../../hookState'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase'

const TabsMenu = ({isMore = false}) => {
       

    const auth = getAuth();
    const user = auth.currentUser;



    const [active, setActive] = useState(1)
    const [selectorClass, setselectorClass] = useState("tabs-menu__item__selector")


    const getInfo = async  () => {
        const docRef = doc(db, "VitamuUsersREAL", `${user.email}`);
    
        //Paying users
        await  getDoc(docRef).then((doc) => {

            if (doc.exists()) {
                console.log("Current data: ", doc.data());

                doc.data().isAskQuestion && setActive(3)
                  
            }
            
        })
    }

    useEffect(() => {
        getInfo()
    }, [])
         

    
    
    useEffect(() => {
        switch (active) {
            case 1:
                setselectorClass("tabs-menu__item__selector")
                break;
            case 2:
                setselectorClass("tabs-menu__item__selector--2")
                break;
            case 3:
                setselectorClass("tabs-menu__item__selector--3")
                break;
            case 4:
                setselectorClass("tabs-menu__item__selector--4")
                break;
            case 6:
                setselectorClass("tabs-menu__item__selector--6")
                break;
            default:
                setselectorClass("tabs-menu__item__selector")
                break;
        }
       
    }, [active])

  
  return (
       
    <>
       { 
       !isMore ?
          <div  className='tabs-menu__item'>
              <div className={selectorClass}></div>
              <p className={` ${active == 1 && "tabs-menu__item__text" }`} onClick={()=>{setActive(1); setGlobalState("userPanelNavIndex", 1)}} >  Rechecks  </p>
              <p className={` ${active == 2 && "tabs-menu__item__text" }`} onClick={()=>{setActive(2); setGlobalState("userPanelNavIndex", 2) }  }>  Images  </p>
              <p className={` ${active == 3 && "tabs-menu__item__text" }`} onClick={()=>{setActive(3); setGlobalState("userPanelNavIndex", 3) } }>  Messages  </p>
              <p className={` ${active == 4 && "tabs-menu__item__text" }`} onClick={()=>{setActive(4); setGlobalState("userPanelNavIndex", 4)  } }>  More  </p>
          </div>
          :

        <div  className='tabs-menu__item2'>
          
          <div className={` duration-300 bg-[#142b6f] h-[82%] w-[26.8%] left-[2%] ${active == 6 && " w-[26.4%] left-[30%]"} ${active == 7 && " w-[26.4%] left-[55.4%]"} ${active == 8 && " w-[14.9%] left-[83.5%]"} rounded-[20px]  -z-10 absolute`}></div>
         
          <p className={`   ${ (active != 6 && active != 7 &&  active != 8 )  ?  "text-[#fff] " : "text-[#142b6f] "  }   ${active == 5  &&  "text-[#fff] "}  `} onClick={()=>{setActive(5); setGlobalState("userPanelNavIndex", 5)  } } >   Self - Exam    </p>
          
          <p className={` text-[#142b6f]   ${active == 6 &&  "text-[#fff] "}   `} onClick={()=>{setActive(6); setGlobalState("userPanelNavIndex", 6) }  }>  Upgrade   </p>
         
          <p className={` text-[#142b6f]   ${active == 7 &&  "text-[#fff] "}  `} onClick={()=>{setActive(7); setGlobalState("userPanelNavIndex", 7) } }>  Get Help   </p>
         
          <p className={` text-[#142b6f]   ${active == 8 &&  "text-[#fff] "} `} onClick={()=>{setActive(8); setGlobalState("userPanelNavIndex", 8)  } }>  Info  </p>
   
       </div>

       
        }
      
    </>
  )
}

export default TabsMenu


/*  

userPanelNavIndex 1  : Rechecks
userPanelNavIndex 2  : Images
userPanelNavIndex 3  : Messages
userPanelNavIndex 4  : More

userPanelNavIndex 5  : Self - Exams
userPanelNavIndex 6  : Upgrade
userPanelNavIndex 7  : Get Help
userPanelNavIndex 8  : Info






*/
