import React from 'react'
import Services from './Services'

const MRI = () => {
  return (
    <>
    <Services
    title={'MRI'}
    imageUrl={'https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2002.34.11.jpeg' }
    heroText={"Get your MRI second opinion today. "}
    otherScanning={[
      {title:'CT Scan', url:'/ct-scan', imageUrl:"https://vitamu.imgix.net/Screenshot%202023-09-07%20at%2002.35.46.png", text:"Missed diagnosis is very common in CT scan interpretation due to the complexity of the body parts in CT scan images. We fix this."},
      {title:'Mammogram', url:'/mammogram', imageUrl:"https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80", text:"%10 of cancer cases are missed on a mammogram screening due to human error. A second opinion solves the human error problem."},
      {title:'X-Ray', url:'/x-ray', imageUrl:"https://vitamu.imgix.net/Screenshot%202023-09-07%20at%2002.39.35.png", text:"X-Ray is a relatively simple technology, but underestimating what it says could have chaotic consequences.  "},
      {title:'Ultrasound', url:'/ult', imageUrl:"https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2002.33.29.jpeg", text:"Interpretation of ultrasound images is always tricky. When you get a second opinion on your ultrasound, we ensure nothing is missed."},
      
    ]}
  />
    </>
  )
  
}

export default MRI