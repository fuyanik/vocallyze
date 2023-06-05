import React from 'react'

import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
  import {Routes} from 'react-router-dom';

  
import Home from './pages/Home';
import Form from './pages/Forms/Form.js';
import PayScreen from './pages/PayScreen/payScreen';
import StepperLight from './pages/Forms/components/stepperLight';
  

export default function App() {



  return (
   <Router>
        <Routes> 
            <Route path="/" element={<Home/>}/>  
            <Route path="/form" element={<Form/>}/>  
            <Route path="/pay-screen" element={<PayScreen/>} />
            <Route path="/stepper-light" element={<StepperLight/>} />


          </Routes>
    </Router>
  )
}

