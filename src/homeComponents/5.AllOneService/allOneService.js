import React from 'react'
import "./style/allOneService.css"


import { useState } from 'react'

const AllOneService = () => {


    const serviceObj = [
        {
            id: 0,
            img: "https://vitamu.imgix.net/img1.jpg?auto=undefined%2Ccompress",
            imgHover: "https://vitamu.imgix.net/img1.jpg?auto=undefined%2Ccompress",
            imgHoverText:"Get Started",
            title: 'Essential for Women',
            titleBig: "Mammogram Recheck",
            description: "We recheck your mammograms to ensure that you are breast cancer free."
        },


       
        {
            id: 1,
            img: "https://vitamu.imgix.net/img2.jpg?auto=undefined%2Ccompress",
            imgHover: "https://vitamu.imgix.net/img2.jpg?auto=undefined%2Ccompress",
            imgHoverText:"Start Today ",
            title: 'Essential for Women ',
            titleBig: "Self-Exam Reminder",
            description: "The best way to detect abnormalities in your breasts is to conduct a monthly breast self-exam.",
        },

       
        {
            id: 2,
            img: "https://vitamu.imgix.net/img3.jpg?auto=undefined%2Ccompress",
            imgHover: "https://vitamu.imgix.net/img3.jpg?auto=undefined%2Ccompress",
            imgHoverText:"Schedule yours today ",
            title: "Hassle-Free ",
            titleBig: "Mammogram Scheduler",
            description: "We can find you an imaging centre where you can have your annual mammogram screening.",
        },

       
        {
            id: 3,
            img: "https://vitamu.imgix.net/img4.jpg?auto=undefined%2Ccompress",
            imgHover: "https://vitamu.imgix.net/img4.jpg?auto=undefined%2Ccompress",
            imgHoverText:"Learn More ",
            title: "Must Have",
            titleBig: "Mammogram Storage",
            description: " We provide a place for you to store all of your mammograms for free.",
        },

       
  
  
    ];


    const [hoverNu, setHoverNu] = useState(10);


  return (
    <div className='all-one-service'>
      
      <div className='all-one-service__main__header'>
                <p>An all in one service.</p>
                <p style={{opacity: "0"}}>Shop All</p>
            </div>
    
       <div
      
        className='all-one-service__main'>
       
            

            <div className='all-one-service__main__hero'>
                 
                {
                    serviceObj.map((item, idx) => (
                        
                        <div
                         onMouseMove={() => 
                            setHoverNu(idx) 
                        }
                        onMouseLeave={() =>{
                            setHoverNu(10)
                        }}
                       
                       key={item.id} className='all-one-service__main__hero__card'>
                            <div className='all-one-service__main__hero__card__img'>
                              {hoverNu == idx ? <img src={item.imgHover}/>  :    <img src={item.img}/>}
                             
                             { hoverNu == idx &&  <div className='all-one-service__main__hero__card__img__footer'>
                                    <p> {item.imgHoverText} </p>
                                    <p>➔</p>
                                </div>
                          }
                            </div>

                            <i>{item.title}</i>
                            <p>{item.titleBig}</p>
                            <p>{item.description}</p>

                            
                        
                        
                        </div>
                         
                    ))
                }
            
            </div>
            
       </div>
      
    </div>
  )
}

export default AllOneService;
