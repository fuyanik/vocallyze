<>
{ 


  mq.matches ? <UserPanelMobile/>  : 
       (
        
    <div className="userPanel">
       <div className="userPanel-main">
      
      <ToastContainer/>

      <div className="userPanel-main-header">
       
        <Link to="/"><img  alt='img'  className="userPanel-main-header-logo"   src={vitamuLogo}/></Link>
       
        <Link className="style-none" to="/"><p className="userPanel-main-header-text"    >Go to Vitamu.com</p></Link>

      </div>




      <div className="userPanel-main-body">

        <div className="userPanel-main-body-left">
           
             <div className="userPanel-main-body-left-header"> 
               <p>Hello {user.displayName}</p>
               <p>This is your Vitamu Account. You can track your rechecks, enroll breast self-exam reminder, and upload/download medical images here.</p>
             </div>

             
              <div className="userPanel-main-body-left-sections"> 
                <div
                onClick={() => {setIsSelect1(true); setIsSelect2(false); setIsSelect3(false); setIsSelect4(false); setIsSelect5(false);}}
                style={{backgroundColor: isSlect1 && '#45c09f', color: isSlect1 && 'white'}}
                >My Rechecks</div>
                <div
               style={{backgroundColor: isSlect2 && '#45c09f', color: isSlect2 && 'white'}}
                onClick={() => {setIsSelect1(false); setIsSelect2(true); setIsSelect3(false); setIsSelect4(false); setIsSelect5(false);}}
                >My Images</div>
                <div
               style={{backgroundColor: isSlect3 && '#45c09f', color: isSlect3 && 'white'}}
               onClick={() => {setIsSelect1(false); setIsSelect2(false); setIsSelect3(true); setIsSelect4(false); setIsSelect5(false);}}
                >Self-Exam Reminder</div>
                <div
                style={{backgroundColor: isSlect4 && '#45c09f', color: isSlect4 && 'white'}}
               onClick={() => {setIsSelect1(false); setIsSelect2(false); setIsSelect3(false); setIsSelect4(true); setIsSelect5(false);}}
                >Health Records Release Form</div>
                <div
               style={{backgroundColor: isSlect5 && '#45c09f', color: isSlect5 && 'white'}}
              onClick={() => {setIsSelect1(false); setIsSelect2(false); setIsSelect3(false); setIsSelect4(false); setIsSelect5(true);}}
                >My Information</div>
              </div>
            
            
             <div className="userPanel-main-body-left-footer"> 
                <div>New Recheck</div>
               
               <Link className="style-none" to="/">
                  <div onClick={() => {

                    

                    auth.signOut();
                   
                  }}
                  >Log-out</div>
               </Link>
             </div>

        </div>


        {/* Changable Area */}


         {/* My Recheck*/}
        {isSlect1 && 
        
        <div className="userPanel-main-body-right-MyRechecks"> 

           <div className="userPanel-main-body-right-myRechecks-header">  

             <p>Date</p>
             <p>Status</p>
             <p>Report</p>
           
          </div>

          <div className="panel-accordion"> 
              
              <CustomizedAccordions
              
              />

          </div>
        
        
        </div> }
      
      
        {/* My Images*/}
        {isSlect2 &&    
        
        <div className="userPanel-main-body-right-MyRechecks"> 

           <div className="userPanel-main-body-right-myRechecks-header">  

             <p>Date</p>
             <p>Type</p>
             <p>Download</p>

          </div>

          <div className="panel-accordion"> 
              
              <CustomizedAccordions2/>

          </div>
         
          



        </div> }

        {/* Self-Exam Reminder*/}  
        {isSlect3 && 
        
        <div className="userPanel-main-body-right-MyRechecks"> 
             



             <div className="self-exam"> 
              
               <div className="self-exam-header">
                   <p>According to the John Hopkins University, 40% of breast cancer is diagnosed by women who feel a lump. This explains why breast-self exams are so important. The National Breast Cancer Foundation recommends conducting a breast self-exam once a month. </p>
                   <p>However, a recent survey has indicated only 12% of women conduct a self-breast exam regularly, which is extremely low considering the cost of a late diagnosis and treatment in advance. </p>
                   <p>Here is a new reminder for you. Once you enroll, we will remind your self-exam every month via phone, e-mail, or both.</p>             
                  <hr className="userPanel-solid"/>
               </div>
                     
               <div className="self-exam-body">
                  <div className="self-exam-body-child">
                     <p>  Remind me day </p> <SelectLabels/> <p> of every month. </p>
                  </div>
                 
                  <div className="self-exam-body-child">
                     <p>  I want to be reminded by </p> <SelectLabels2/>
                  </div>

                  <div onClick={SelfExamEnrollButton} className="self-exam-body-button">Enroll Today</div>
                  <hr className="userPanel-solid2"/>
                </div>

                <div className="self-exam-footer"> 
                  <p>We also have a visual guide that will help you learn how to conduct breast-self exam.</p>

                  <div className="self-exam-footer-child">

                    <div className="self-exam-footer-child-button">Download PDF</div>  <p>or</p>  <div className="self-exam-footer-child-button">Watch on Youtube</div>
                    

                  </div>


                </div>
             



           
             </div>
 

          

       
        
        
        
        </div>}
        
        {/* Health-Records Form*/}  
        {isSlect4 && 

            <div className="health-records">
              
              <p>We can acquire your medical copies anywhere in the world, with your written permission.</p> 
              <p>Choose where your medical records are, download, fill and sign the form, and upload the picture of it here. That’s it.</p>
              
              <SelectLabels3/>
              <SelectLabels4/>
              <SelectLabels5/>

              <div className="health-records-button">Download the Form</div>

              <p>When filled and signed.</p>
              <p>Take a picture or screenshot.</p>

              <div className="health-records-button2">Upload the Image</div>
               
            </div>
      }
        
        {isSlect5 && 
        <div className="userPanel-main-body-info"> 
           <div className="userPanel-main-body-info-left">

                <div className="userPanel-main-body-info-left-card">
                  <span>Your Info Card</span>
                 
                  <div> 
                    <p>Name</p>
                    <p>{user.displayName}</p> 
                  </div>

                  <div> 
                    <p>Date of the Birth</p>
                    <p> { 2022 -  userAge }</p> 
                  </div>

                  <div> 
                    <p>E-mail address</p>
                    <p>{user.email}</p> 
                  </div>

                  <div> 
                    <p>Phone Number</p>
                    <p>{userPhone}</p> 
                  </div>

                  <div> 
                    <p>Last Bi-rads Score</p>
                    <p>{userBiRads}</p> 
                    
                  </div>

                  <div className="userPanel-main-body-info-left-card-button" >Delete My Account</div>


                </div>


           </div>
           <div className="userPanel-main-body-info-right">

            <div className="userPanel-main-body-info-right-child">
              <p> Change your e-mail address</p>
              <input value={val} onChange={onChangeEmail} className="nameİnput"/>
              <div onClick={ChangeEmail} > Update E-mail</div>
            </div>

            <div className="userPanel-main-body-info-right-child">
              <p> Change your phone number</p>
              <input onChange={changePhone} className="nameİnput"/>
              <div onClick={updatePhoneNumber}> Update Phone Number</div>
            </div>

            <div className="userPanel-main-body-info-right-child">
              <p> Change your password</p>
              <input  onChange={onChangePassword} type="password" className="nameİnput"/>
              <div onClick={updateUserPassword} > Update Password</div>
            </div>

              
           



           </div>
        
        <ToastContainer/>
        </div>
        
        
        }

    
    
    
      </div>
      </div>
    </div> 
    
    )

}

</>