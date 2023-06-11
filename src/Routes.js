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
  

export default function App() {



  return (
   <Router>
        <Routes> 
            <Route path="/" element={<Home/>}/>  
            <Route path="/pay-screen" element={<PayScreen/>} />
            <Route path="/form-new" element={<FormNew/>} />


            <Route path="/swiper-page" element={<SwiperPage/>} />

            


          </Routes>
    </Router>
  )
}

