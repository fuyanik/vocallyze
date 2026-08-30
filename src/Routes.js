import React from 'react'

import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
  import {Routes} from 'react-router-dom';

  
import Home from './pages/Home';
import FormNew from './pages/Forms/FormNew';
import SwiperPage from './pages/Swiper/swiper';

import UserPanel from './pages/UserPanel/userPanel';
import Hero from './homeComponents/2.Hero/hero';
import Login from './pages/Auth/login';
import PasswordReset from './pages/Auth/passwordReset';
import HowWorks from './pages/HowWorks/HowWorks';
import Contact from './pages/DropdownPages/Help/Contact';
import FormNewPayment from './pages/Forms/FormNewPaymen';
import WhySecondOpinion from './pages/WhySecondOpinion/WhySecondOpinion';
import SampleReports from './pages/DropdownPages/SampleReports/SampleReports';
import Faq from './pages/DropdownPages/Faq/faq';
import Payingo from './pages/PayScreen/Payingo';

import Register from './pages/Auth/register';

 


  

export default function App() {


  return (
   <Router>
        <Routes> 
            <Route path="/" element={<Home/>}/>  
            <Route path="/form-new" element={<FormNew/>} />
            <Route path="/form-new-payments" element={<FormNewPayment/>} />

            <Route path="/pay-succes" element={<Payingo/>} />

            <Route path="/user-panel" element={<UserPanel/>} />

           


            <Route path="/swiper-page" element={<SwiperPage/>} />

            <Route path="/get-started" element={<Hero isOutside={true}/>} />

            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/reset-password" element={<PasswordReset/>} />


            <Route path="/how-works" element={<HowWorks/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/why-second-opinion" element={<WhySecondOpinion/>} />
            <Route path="/sample-reports" element={<SampleReports/>} />
            <Route path="/faq" element={<Faq/>} />




          
          









            


          </Routes>
    </Router>
  )
}

