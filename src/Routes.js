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
import PaySucces2 from './pages/PayScreen/paySucces2';
import UserPanel from './pages/UserPanel/userPanel';
import Hero from './homeComponents/2.Hero/hero';
import Login from './pages/Auth/login';
import PasswordReset from './pages/Auth/passwordReset';
import HealthHub from './pages/HealthHub/HealthHub';
import Services from './pages/Services/Services';
import MRI from './pages/Services/MRI';
import Ultrasound from './pages/Services/Ultrasound';
import CTScan from './pages/Services/CtScan';
import Mammogram from './pages/Services/Mammogram';
import Xray from './pages/Services/XRay';
import HowWorks from './pages/HowWorks/HowWorks';
import HealthHubFrame from './pages/iframes/HealthHubFrame';
import RadiologyTeam from './pages/RadiologyTeam/radiologyTeam';
import Contact from './pages/DropdownPages/Help/Contact';
import FormNewPayment from './pages/Forms/FormNewPaymen';
import WhySecondOpinion from './pages/WhySecondOpinion/WhySecondOpinion';
import SampleReports from './pages/DropdownPages/SampleReports/SampleReports';
import Faq from './pages/DropdownPages/Faq/faq';
import Payingo from './pages/PayScreen/Payingo';


  

export default function App() {



  return (
   <Router>
        <Routes> 
            <Route path="/" element={<Home/>}/>  
            <Route path="/form-new" element={<FormNew/>} />
            <Route path="/form-new-payments" element={<FormNewPayment/>} />
          
            <Route path="/pay-screen" element={<PayScreen/>} />

            <Route path="/pay-succes" element={<Payingo/>} />
            <Route path="/pay-succes2" element={<PaySucces2/>} />
            <Route path="/user-panel" element={<UserPanel/>} />

           


            <Route path="/swiper-page" element={<SwiperPage/>} />

            <Route path="/get-started" element={<Hero isOutside={true}/>} />
            <Route path="/health-hub" element={<HealthHub/>} />

            <Route path="/services" element={<Services/>} />

            <Route path="/mri" element={<MRI/>} />
            <Route path="/ultrasound" element={<Ultrasound/>} />
            <Route path="/ct" element={<CTScan/>} />
            <Route path="/mammogram" element={<Mammogram/>} />
            <Route path="/x-ray" element={<Xray/>} />




            
            <Route path="/login" element={<Login/>} />
            <Route path="/reset-password" element={<PasswordReset/>} />


            <Route path="/how-works" element={<HowWorks/>} />
            <Route path="/radiology-team" element={<RadiologyTeam/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/why-second-opinion" element={<WhySecondOpinion/>} />
            <Route path="/sample-reports" element={<SampleReports/>} />
            <Route path="/faq" element={<Faq/>} />




            <Route path="/health-hub-iframe" element={<HealthHubFrame/>} />
          









            


          </Routes>
    </Router>
  )
}

