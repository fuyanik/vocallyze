import React from 'react'
import AccordionSomeQuestion from './accordionSomeQuesiton'
import "./style/someQuestion.css"

const SomeQuestion = () => {
  return (
    <div className='some-question'>

        <div className='some-question__left'>
             <p  className='normal-text'><span style={{fontSize:"24px", width:"140%"}}>Have some questions?</span></p>
             <div className='some-question__left__line'></div>
             <AccordionSomeQuestion/>
        </div>
        
        <div className='some-question__right'>
      



        </div>



    </div>
        
  )
}

export default SomeQuestion