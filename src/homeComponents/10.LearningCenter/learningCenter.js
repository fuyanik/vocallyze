import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./style/learningCenter.css"

const LearningCenter = () => {


  let navigate = useNavigate();




    
  return (
    <div className="learning-center">

     <div className="learning-center__main__header">
          <p>Learning Center</p>
          <p>
           Everyday is a learning day, we are here to help you learn more about breast cancer.
          </p>
        </div>
        
      <div className="learning-center__main">
        

        <div className="learning-center__main__cards">
        
         
            <div onClick={()=>{navigate("/human-error")}} className="learning-center__main__cards__card">
                
                 <div  className='learning-center__main__cards__card__texts'>
                   <p style={{color:"white"}} >Learn more ➔</p>
                   <p style={{color:"white"}}>Due to human error, radiologists can fail to diagnose breast cancer.</p>
                 </div>
  
                 <img style={{opacity:"1" }} src="https://vitamu.imgix.net/i3.jpg?auto=undefined%2Ccompress"/>
                
            </div>
         
       
       
        
            <div onClick={()=>{navigate("/resources")}} className="learning-center__main__cards__card">
                
                 <div className='learning-center__main__cards__card__texts'>
                   <p>Visit resources ➔</p>
                   <p>Everything you need to know about breast cancer.</p>
                 </div>
  
                 <img  src="https://vitamu.imgix.net/i1.jpg?auto=undefined%2Ccompress"/>
                
            </div>
      
       
        
           <div onClick={()=>{navigate("/technology")}} className="learning-center__main__cards__card">
              
               <div className='learning-center__main__cards__card__texts'>
                 <p>Discover our technology ➔</p>
                 <p>Our technology save lifes.</p>
               </div>

               <img  src="https://vitamu.imgix.net/i2.jpg?auto=undefined%2Ccompress"/>
              
          </div>
       
       
        </div>
      </div>
    </div>
  );
}

export default LearningCenter
