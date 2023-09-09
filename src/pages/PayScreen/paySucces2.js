import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const PaySucces2 = () => {

  const navigate = useNavigate()

    
  useEffect(() => {

   
    setTimeout(() => {

      //navigate new page 
      window.location.href = "https://www.mitrua.com/pay-succes "

     


       

      

     

    }, 300)
   

  }, [])


  return (
    <div></div>
  )
}

export default PaySucces2