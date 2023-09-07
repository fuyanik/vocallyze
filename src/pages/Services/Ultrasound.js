import React from 'react'
import Services from './Services'

const Ultrasound = () => {
  return (
    <Services
    title={'Ultrasound'}
    imageUrl={'https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2002.33.29.jpeg' }
    otherScanning={[
      {title:'MRI', url:'/mri', imageUrl:"https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2002.34.11.jpeg", text:"A second opinion for an MRI is crucial because it provides an additional expert assessment of the images, helping to confirm or refine the initial diagnosis. "},
      {title:'CT Scan', url:'/ct-scan', imageUrl:"https://vitamu.imgix.net/Screenshot%202023-09-07%20at%2002.35.46.png", text:"Missed diagnosis is very common in CT scan interpretation due to the complexity of the body parts in CT scan images. We fix this."},
      {title:'X-Ray', url:'/x-ray', imageUrl:"https://vitamu.imgix.net/Screenshot%202023-09-07%20at%2002.39.35.png", text:"X-Ray is a relatively simple technology, but underestimating what it says could have chaotic consequences.  "},
      {title:'Mammogram', url:'/mammogram', imageUrl:"https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80", text:"%10 of cancer cases are missed on a mammogram screening due to human error. A second opinion solves the human error problem."},
    ]}
    />
  )
}

export default Ultrasound