import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const PaySucces2 = () => {

  const navigate = useNavigate()

    
  useEffect(() => {

    // wait 1 second 
    setTimeout(() => { navigate('/pay-succes')}, 1000)
   

  }, [])


  return (
    <div>asdasd</div>
  )
}

export default PaySucces2