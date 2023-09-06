import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const PaySucces2 = () => {

  const navigate = useNavigate()

    
  useEffect(() => {

    // wait 1 second 
    navigate('/pay-succes')
   

  }, [])


  return (
    <div>asdasd</div>
  )
}

export default PaySucces2