import React from 'react'
import Services from './Services'

const Pregnancy = () => {
  return (
    <>

   <Services
    title={'Pregnancy'}
    imageUrl={'https://vitamu.imgix.net/natalia-blauth-E2sVEHpQD6o-unsplash.jpg?w=2832&h=4256&auto=compress%2Cformat' }
    otherScanning={[
      {title:'MRI', url:'/mri', imageUrl:"https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2002.34.11.jpeg", text:"A second opinion for an MRI is crucial because it provides an additional expert assessment of the images, helping to confirm or refine the initial diagnosis. "},
      {title:'CT Scan', url:'/ct-scan', imageUrl:"https://vitamu.imgix.net/Screenshot%202023-09-07%20at%2002.35.46.png", text:"Missed diagnosis is very common in CT scan interpretation due to the complexity of the body parts in CT scan images. We fix this."},
      {title:'X-Ray', url:'/x-ray', imageUrl:"https://vitamu.imgix.net/Screenshot%202023-09-07%20at%2002.39.35.png", text:"X-Ray is a relatively simple technology, but underestimating what it says could have chaotic consequences.  "},
      {title:'Ultrasound', url:'/ult', imageUrl:"https://vitamu.imgix.net/WhatsApp%20Image%202023-09-07%20at%2002.33.29.jpeg", text:"Interpretation of ultrasound images is always tricky. When you get a second opinion on your ultrasound, we ensure nothing is missed."},
      
    ]}
    />
    
    
    </>
  )
}

export default Pregnancy