import React from 'react'

import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
  import {Routes} from 'react-router-dom';

  
import Home from './pages/Home';
import PayScreen from './pages/PayScreen/payScreen';
import FormNew from './pages/Forms/FormNew';
import SwiperPage from './pages/Swiper/swiper';
import PaySucces from './pages/PayScreen/paySucces';
import UserPanel from './pages/UserPanel/userPanel';
  

export default function App() {



  return (
   <Router>
        <Routes> 
            <Route path="/" element={<Home/>}/>  
            <Route path="/form-new" element={<FormNew/>} />
          
            <Route path="/pay-screen" element={<PayScreen/>} />
            <Route path="/pay-succes" element={<PaySucces/>} />
            <Route path="/user-panel" element={<UserPanel/>} />


            <Route path="/swiper-page" element={<SwiperPage/>} />


            


          </Routes>
    </Router>
  )
}

