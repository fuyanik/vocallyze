import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const PaySucces2 = () => {

  const navigate = useNavigate()

    
  useEffect(() => {

    // wait 3 seconds and redirect to pay-succes
    setTimeout(() => {

      navigate('/pay-succes')

    }, 300)
   

  }, [])


  return (
    <div></div>
  )
}

export default PaySucces2