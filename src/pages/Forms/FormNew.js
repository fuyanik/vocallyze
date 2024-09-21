import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../homeComponents/1.Navbar/navbar';
import CardHaveInsurance from '../../formComponents/CardHaveInsurance/cardHaveInsurance.js';
import Card9 from '../../formComponents/Card9/card9';
import SwiperPage from '../Swiper/swiper';
import { setGlobalState, useGlobalState } from '../../hookState';
import PayScreen from '../PayScreen/payScreen';
import Popup from '../Popup/popup';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import gV from '../../gV';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Timestamp } from 'firebase/firestore';

import Insurance from './components/Insurance';
import AvailableRadiologists from './components/availableRadiologists';
import emailjs from 'emailjs-com';
import SampleReports from '../DropdownPages/SampleReports/SampleReports';
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import Login from '../Auth/login';
import { Link, Navigate } from 'react-router-dom';
import NavbarGen from '../../homeComponents/NavbarGen/NavbarGen.jsx';
import lottie from 'lottie-web';


const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#000000',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#000000',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


const steps = ['', '', '', '', ''];

const medicalSendType = [
  'I can upload the images now or later.',
  'I prefer to ship the CD or USB stick.',
  'I will share an access code.',
  'I authorize you to acquire my images.',
];


export default function FormNew() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Ekran boyutu değiştiğinde tetiklenecek fonksiyon
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px, mobil ve web ayırımı için örnek bir genişliktir
    };

    // Ekran boyutu değişikliklerini dinleme
    window.addEventListener('resize', handleResize);

    // Component unmount olduğunda event listener'ı temizle
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logo = useRef(null)
  const logo2 = useRef(null)
  const logo3 = useRef(null)



//lottie anims
useEffect(() => {
 
  lottie.loadAnimation({
   container: logo.current,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: require('./assets/anim7.json')
 })
  lottie.loadAnimation({
   container: logo2.current,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: require('./assets/anim9.json')
 })
  lottie.loadAnimation({
   container: logo3.current,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: require('./assets/anim11.json')
 })



 return () => { lottie.destroy() }
},[])



  //All amount variables and *Global* variables are set here
  //...
  const AmountCalculator = (mainPay) => {
    if (gV.insuranceCompany === 'United Healthcare') {
      gV.discountPercent = 20;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Oscar') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Aetna') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Molina Healthcare') {
      gV.discountPercent = 20;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Humana') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Cigna') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Magellan') {
      gV.discountPercent = 20;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Anthem') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Blue California') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Blue Shield') {
      gV.discountPercent = 20;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Care Plus') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Freedom Health') {
      gV.discountPercent = 20;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'WellCare') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'United American') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (gV.insuranceCompany === 'Caresource') {
      gV.discountPercent = 25;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }

    if (
      gV.insuranceCompany === 'I do not have an active insurance plan.' ||
      gV.insuranceCompany === 'My insurance is not listed.' ||
      gV.insuranceCompany === 'none'
    ) {
      gV.discountPercent = 0;

      //Insurance discount
      //...
      gV.discountAmount = mainPay * (gV.discountPercent / 100);

      //Total amount user see pay plans page
      //...
      gV.payTotal = mainPay - gV.discountAmount;

      return gV.payTotal;
    }
  };

  // Local storage'a veri eklemek için bir fonksiyon
  const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  
  const auth = getAuth();
  const user = auth.currentUser;

  const [isOpenPaymentPopup, setIsOpenPaymentPopup] = useState(false);

  const [activeStep] = useGlobalState('activeStep');
  const [mainPayAmount] = useGlobalState('mainPayAmount');
  const [doctors] = useGlobalState('doctors');
  const [paymentPlan] = useGlobalState('paymentPlan');
   const [isDropdownSet] = useGlobalState("isDropdownSet")

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [medicalCenter, setMedicalCenter] = useState('');

  const [isCameForm, setIsCameForm] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const [dropdownText, setDropdownText] = useState('Choose your answer.');

 

  useEffect(() => {
    
    
    setName(localStorage.getItem("name"))
    setQuestion(localStorage.getItem("question"))
    setMail(localStorage.getItem("mailAddress"))
  
  }, []);

  /*
 //Create random password
  useEffect(() => {
    //Create random password
    //...
    if (!user) {
      gV.password = Math.random().toString(36).slice(-10);
      addToLocalStorage('pass', gV.password); // Local storage'a veriyi ekler
      setIsCameForm(true);
    }
  }, []);
*/
  {
    /* Start Step Contents */
  }
  const contactInputStyle =
    'w-[96%] lg:w-[70%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center border border-white rounded-2xl duration-1000 outline-none  focus:border-priTrans  bg-slate-100 ';

  {
    /* Contact Detail */
  }
  const ContactDetail = (
    <section className='w-[92vw] lg:w-full  animate-fadeIn flex flex-col h-[58%] pt-0 px-2 text-pri'>
      <header className='flex flex-col gap-2'>
        <header className='gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] '>
          <p className='lg:text-[32px] text-[22px] font-bold text-pri'>Contact Details</p>

          <p className='text-[16px] mt-1 font-bold text-pri'> Step {activeStep + 1} of 4</p>
        </header>

        <p className='text-[16px] leading-[22px] mt-2  text-priTrans'>
          {' '}
          We have saved all the information you provided, and our doctors will review it as soon as possible. To keep you informed about your case, we will need your email address. 
        </p>
      </header>

      {/* Name */}
      <div className=' hidden flex-col gap-1 mt-2'>
        <p className='text-lg text-pri font-bold mt-4'> What is your name?</p>

        <input
          value={name || user?.displayName}
          onChange={(e) => {
            setName(e.target.value);
            addToLocalStorage('name', e.target.value); 
          }}
          type='text'
          className={contactInputStyle}
          placeholder='Type your name here.'
        />
      </div>

      {/* Mail */}
      <div className='flex flex-col gap-1'>
  <p className='text-lg text-pri font-bold mt-4'>E-Mail Address</p>
  <input
    
    value={mail || localStorage.getItem("mailAddress")}
    onChange={(e) => {
      const lowerCaseEmail = e.target.value.toLowerCase(); // Küçük harfe çevir
      setMail(lowerCaseEmail);
      gV.MailAddres = lowerCaseEmail;
      addToLocalStorage('mailAddress', lowerCaseEmail); // Local storage'a veriyi ekler
    }}
    type='email'
    className={contactInputStyle}
    placeholder='Type your email address here.'
  />
</div>

      {/* Phone */}
      <div className=' hidden flex-col gap-1  '>
        <p className='text-lg text-pri font-bold mt-4 '> Password</p>
        <input
          value={phone || user?.providerData[0].phoneNumber}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type='phone'
          className={contactInputStyle}
          placeholder='Type your phone number here.'
        />
      </div>

      <div className='flex flex-col gap-1 items-center justify-center py-3 px-3 w-full lg:w-[60%] shadow-xl bg-black  rounded-[30px] border border-teal-200 iphone7:mt-3 mt-10'>
      <img className='' width="55" height="55" src="https://img.icons8.com/clouds/100/checkmark--v1.png" alt="checkmark--v1"/>
      <p className='font-bold text-white'>Your data is securely stored and protected</p>
      <p className='text-sm text-white opacity-70 text-center'>We do not send spam or share your information with third parties.</p>
      <p></p>
      </div>
    </section>
  );

  {
    /* History Symptoms */
  }
  const HistorySymptoms = (
    <section className='w-[92vw] lg:w-full animate-fadeIn flex flex-col h-[58%]  pt-0 px-2 text-pri'>
      <div className='flex flex-col gap-2'>
        <header className=' flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707]  '>
          <p className='lg:text-[32px] text-[22px] font-bold text-black'>History and Symptoms</p>

          <i className='text-[16px] mt-1 font-bold text-black'> Step {activeStep + 1} of 4</i>
        </header>
      
        <p className='text-lg text-black font-bold mt-1'>Full name</p>
        <input
          value={name || localStorage.getItem("name")}
          onChange={(e) => {
            setName(e.target.value);
            addToLocalStorage('name', e.target.value); 
          }}
          type='text'
          className={contactInputStyle}
          placeholder='First and last'
        />
         
         <p className='text-lg text-black font-bold lg:mt-4 mt-2'> Your personal health story, complaints, concerns, and questions.</p>
       

        <textarea
          value={question || localStorage.getItem("question") }
          onChange={(e) => {
            setQuestion(e.target.value);
            addToLocalStorage('question', e.target.value); 
          }}
          type='text'
          className='w-[96%] lg:w-full   bg-slate-100 mt-1 lg:h-[35vh] shadow-md iphone7:h-[30vh] h-[34vh] p-4  rounded-2xl duration-300 outline-none   focus:ring-1 focus:ring-secondTrans '
          placeholder='Every detail matters to us.'
        />
      </div>
    </section>
  );

  {
    /* Medical Images */
  }
  const MedicalImages = (
    <section className='w-[92vw] lg:w-full animate-fadeIn   flex flex-col h-[58%] pt-0 px-2'>
      <header className='flex flex-col gap-2'>
        <div className='gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] '>
          <p className='lg:text-[32px] text-[22px] font-bold text-pri'>Medical Images</p>

          <p className='text-[16px] mt-1 font-bold text-pri'> Step {activeStep + 1} of 4</p>
        </div>

        <p className='text-[16px] hidden leading-[22px] mt-2  text-priTrans'>
          {' '}
          We respect your privacy. Your contact details will not be shared with anyone.
        </p>
      </header>

      {/* Do You Have Medical Images */}
      <div className='flex flex-col gap-5 '>
        {/* Medical Images Question with Dropdown */}
        <div className='flex flex-col gap-2'>
          <p className='text-[17px] text-pri font-bold mt-4 lg:w-[55%] w-[96%]'>
            How do you want to share your medical images?
          </p>

          {dropdownText == 'I will share an access code.' && (
            <p className='text-priTrans'>
              {' '}
              Once you share your access code with access@medifyre.com, image status will be updated.{' '}
            </p>
          )}
          {dropdownText == 'I prefer to ship the CD or USB stick.' && (
            <p className='text-priTrans'>
              {' '}
              It may take up to 7 days to obtain physical copies of your images. If you can upload the images by
              yourself, your recheck report will be ready tomorrow.{' '}
            </p>
          )}

          {/* Dropdown Select Area */}
          <div className='  lg:w-[22vw] w-[84vw] h-[7vh] bg-slate-100 lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer'>
            <div
              onClick={() => {
                setDropdown(!isDropdown);
              }}
              className='h-[96%] w-[120%] text-pri justify-between  flex items-center px-4 rounded-full z-10 duration-200 ease-in-out '>
              <p> {dropdownText}</p>
              <img
                className={`absolute   right-6 lg:right-5 text-[13px] ${
                  !isDropdown ? 'rotate-180' : 'rotate-270 '
                } duration-500`}
                width='18'
                height='18'
                src='https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png'
                alt='collapse-arrow'
              />
            </div>

            {/* Dropdown White Area */}
            {isDropdown && (
              <div className='absolute z-40 flex flex-col gap-3 items-start py-2  text-pri w-full h-auto overflow-y-auto bg-white top-[9vh] animate-fadeIn rounded-2xl shadow-xl'>
                {medicalSendType.map((name, idx) => (
                  <p
                    className={` py-[3px] px-3   w-full text-left `}
                    onClick={() => {
                      setDropdown(false);
                      setDropdownText(name);
                    }}>
                    {name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* All Medical Images Options Start Here */}

        {/* Image Upload */}
        {dropdownText == 'I can upload the images now or later.' && (
          <div className='flex flex-col gap-3 text-pri animate-fadeIn '>
            <p className=' text-[#000000b7]  border-t-2  border-[#000000be]'></p>

            <div className='relative bottom-1'>
              <Card9 totalRecheck={1} displayText={'none'} buttonText={'Upload Image'} itemsScrollType={''} />
            </div>
          </div>
        )}

        {/* Shipping CD or USB */}
        {dropdownText == 'I prefer to ship the CD or USB stick.' && (
          <div className='flex flex-col gap-3 text-pri animate-fadeIn '>
            <p className=' text-[#000000b7] border-t-2  border-pri pt-2'>
              You may ship your images in a CD or USB stick to the address below:
            </p>

            <div className='flex flex-col border bg-slate-50 px-2 py-1 gap-1 rounded-lg '>
              <p className='mt-2'>Medifyre, Inc.</p>
              <p>169 Madison Ave #2305 New York, NY 10016</p>
              <p>+1 646 820 1932</p>
            </div>
          </div>
        )}

        {/* Share Acces Code */}
        {dropdownText == 'I will share an access code.' && (
          <div className='flex flex-col gap-3 text-pri animate-fadeIn '>
            <p className=' text-[#000000b7] border-t-2  border-pri pt-2'>
              If you have an access code from your provider, you may share it with the e-mail address below:
            </p>

            <div className='flex flex-col bg-slate-50 px-3 py-2 gap-1 border rounded-lg '>
              <p className=''>access@medifyre.com</p>
            </div>
          </div>
        )}

        {/* Authorize */}
        {dropdownText == 'I authorize you to acquire my images.' && (
          <div className='flex flex-col gap-3 text-pri animate-fadeIn '>
            <p className=' text-[#000000b7] border-t-2  border-pri pt-2'>
              No problem, we will acquire your medical files on your behalf. Please type the name of the medical center
              where you got your screening.
            </p>

            <input
              value={medicalCenter}
              onChange={(e) => {
                setMedicalCenter(e.target.value);
              }}
              type='text'
              className={contactInputStyle}
              placeholder='Type the name of your medical center'
            />
          </div>
        )}
      </div>
    </section>
  );

  //Close popup page
  //...
  function onDismiss() {
    setIsPopupOpen(false);
  }
  function onDismiss2() {
    setIsPopupOpen2(false);
  }

  //Sing up user
  //...
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, mail, gV.password).then((userCredential) => {
        // Signed in
        console.log('SIGN UP SUCCESS');

        const user = userCredential.user;

        var templateParams = {
          user_name: name,
          user_email: mail,
          password: gV.password,
        };
        //send email

        user && emailjs.send('service_i7knjsi', 'template_oazumi8', templateParams, 'xBTh1qYqTM9n5L1_P');
      });
      updateProfile(auth.currentUser, { displayName: name });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setGlobalState('isLoginPopup', true);
        console.log('SIGN UP ERROR');
        return;
      }
      if (error.code === 'auth/invalid-email') {
        console.log('SIGN UP ERROR');
        return;
      }
    }
  
  };

  const [isLoginPopup] = useGlobalState('isLoginPopup');

  useEffect(() => {
    setGlobalState('isLoginPopup', false);
  }, []);

  useEffect(() => {
    const currentStep = user?.accessToken ? 1 : 0;
    //setGlobalState('activeStep', currentStep);
    setGlobalState('isLoginPopup', false);
  }, [user?.accessToken]);


  useEffect(() => {
   
    setDoc(
      doc(db, 'MedifyrePartial', `${user ? user.email : gV.MailAddres }`),
      {
        Rechecks: {
          formStep: activeStep,
          activeStep: 0,
          createDay: new Date().getDate(),
          createMonth: new Date().getMonth(),
          createYear: new Date().getFullYear(),
          bodyParts: gV.bodyParts,
          scanType: gV.scanType,
          name: name,
          mail: mail,
          phone: phone,
          question: question,
          medicalSendType: dropdownText,
          medicalCenter: medicalCenter,
          insurance: gV.insuranceCompany,
          isPay: false,
          createdAt: Timestamp.now().toDate(),
          doctors: doctors,
          paymentPlan: paymentPlan,
          password: gV.password,
        },
      },
      { merge: true },
    );
    
  }, [activeStep]);
  
  

  return (
    <> 
 

      {/* Pay Popup */}
      <Popup
        open={isPopupOpen}
        onDismiss={onDismiss}
        contents={
          <div>
            <h1
              onClick={() => {
                setIsPopupOpen(false);
              }}
              className='absolute z-50 cursor-pointer right-6 top-0 bg-black text-white px-3 py-1 rounded-full'>
              {' '}
              Close
            </h1>
            <PayScreen />
          </div>
        }
        close={false}
      />

      {/* Sample Repors Popup */}
      <Popup
        close={true}
        open={isPopupOpen2}
        onDismiss={onDismiss2}
        contents={
         
         
            <SampleReports isOutside={true} isPopup={true} />
         
        }
      />

     
      <div className={`w-screen h-screen overflow-hidden   ${isDropdownSet && "lg:bg-black/20 bg-normal" } ${isPopupOpen && "lg:blur-lg blur-none"} duration-700 lg:flex lg:flex-row flex flex-col items-center  font-product `}>

        {/*  Stepper */}
        {false && (
          <Stack sx={gV.mq.matches ? { width: '100%' } : { width: '55%' }} spacing={5}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {steps.map((label, idx) => (
                <Step key={idx}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        )}
        
        <div className='lg:w-1/2  lg:px-10   relative w-screen h-full  flex flex-col items-center lg:justify-center justify-start  '>
         
         {/* Web Logo */}
         <Link to={"/"}>  <img className='absolute lg:flex hidden   w-52 top-2 left-10' src='https://vitamu.imgix.net/MEDIFYRE-6.png?w=6400&h=3600&ar=6400%3A3600"' alt='medifyre logo'/> </Link> 
       
          {/* Mobile Logo & Sample Reports */}
         <div className='flex lg:hidden w-full px-5 justify-between items-center  '>
           <Link to={"/"}>  <img className='  iphone7:w-32 w-40 ' src='https://vitamu.imgix.net/MEDIFYRE-6.png?w=6400&h=3600&ar=6400%3A3600"' alt='medifyre logo'/> </Link> 
      
           <div  onClick={() => {   setIsPopupOpen2(!isPopupOpen2); }}   className='w-fit  duration-500 bg-black text-white  flex items-center gap-5  relative border border-black px-4 py-1 rounded-full text-sm'>
          
            <p className='duration-500'>   {isPopupOpen2 ? 'Close' : 'Sample Report'}   </p>
          
            <img
              className={`h-5 ${isPopupOpen2 ? 'rotate-180' : 'rotate0'}  duration-500 `}
              width='20'
              height='5'
              src='https://img.icons8.com/ios/50/ffffff/expand-arrow--v1.png'
              alt='expand-arrow--v1'
            />
          </div>

         </div>
        
        <div className='lg:hidden flex iphone7:mt-0 mt-2'></div>
     
        {activeStep == 0 && HistorySymptoms}
        {activeStep == 1 && ContactDetail}
        {activeStep == 2 && MedicalImages}
        {activeStep == 3 && <Insurance />}
        {activeStep == 999 && <AvailableRadiologists />}
       
        
         </div>
       

       
       
        {/*  Right Second Opinion Report Area */}
        <div className='lg:flex lg:flex-col  py-16 hidden w-1/2 h-full  bg-slate-50 -z-10 '>
         
          
          <div className='flex w-[100%]  h-[94%] shadow-lg ml-16 border rounded-xl overflow-hidden'>

             <div className='w-[25%] relative h-full bg-slate-100 flex flex-col justify-between'> 
               
               <div className='flex flex-col w-full ml-3 gap-5'> 
                <img className=' w-40 b-4   ' src='https://vitamu.imgix.net/MEDIFYRE-6.png?w=6400&h=3600&ar=6400%3A3600"' alt='medifyre logo'/>
              
                <div className='h-3 w-[55%] rounded-full bg-gray-300'> </div>
                <div className='h-3 w-[80%] rounded-full bg-gray-300'> </div>
                <div className='h-3 w-[65%] rounded-full bg-gray-300'> </div>
              
               </div>
                
               <div className='w-full h-[11%] border-t flex items-center justify-between px-3'>
                
                 <div className='w-8 h-8 bg-second rounded-full items-center justify-center text-white flex'> 
                 {name ? name.charAt(0).toUpperCase() : ''} 
                  
                </div> 

                <img width="16" height="16" src="https://img.icons8.com/ios/50/appointment-reminders--v1.png" alt="appointment-reminders--v1"/>
            
               </div>
           
             </div>


             <div className='w-[75%] h-full  flex flex-col'> 

               <div className='h-[14%] w-full border-b bg-second text-white flex flex-col gap-1  justify-end px-2 py-2'>
                 <p className='text-lg'>Second Opinion Report</p>
                 
                 <div className='flex gap-3'> 
                   <p className='bg-white rounded-full px-4 py-[2px] text-second text-sm items-center justify-center flex'>{gV.bodyParts[0]}</p> 
                   <p className='bg-white rounded-full px-4 py-[2px] text-second text-sm items-center justify-center flex'>{gV.scanType[0]}</p> 
                  </div> 
                
               </div>

               <div className='w-full h-full bg-white flex flex-col gap-8 p-8'> 

                 <div className={` w-full flex gap-3 items-center   `}> 
                      
                    {/* rounded profile */}
                    <div className='flex w-10 h-10 bg-gray-300 rounded-full items-center justify-center'> 
                     <img width="28" height="28" src="https://img.icons8.com/pastel-glyph/64/ffffff/gender-neutral-user.png" alt="gender-neutral-user"/>
                    </div>
                   
                   {/* name */}
                   <div className='flex flex-col items-start justify-start '>
                   { name == "" ?  <div className='h-4 w-[50%] rounded-full bg-gray-200 animate-fadeIn'> </div> :
                    <p className=' text-[20px] font-bold]'> {name}</p>
                    
                  }
                       <p className=' text-[12px] text-black'> {mail}</p>
                    </div>

                 </div>
                
                 <div className={` ${activeStep !== 0 && "hidden"} w-full flex gap-36`}> 
                    <div className='h-3 w-[50%] rounded-full bg-gray-200'> </div>
                    <div className='h-3 w-[20%] rounded-full bg-gray-200'> </div> 
                 </div>
                
                 <div className={` ${activeStep !== 0 && "hidden"} w-full flex gap-16`}> 
                    <div className='h-3 w-[70%] rounded-full bg-gray-200'> </div>
                    <div className='h-3 w-[15%] rounded-full bg-gray-200'> </div> 
                 </div>

                 <div className={` ${activeStep == 0 ? "hidden" : "flex"} w-[90%] flex flex-col gap-2 opacity-40 text-black max-h-40 overflow-y-scroll text-sm animate-fadeInSlow font-product`}> 
                  <p className='text-lg font-bold animate-fadeIn'>History and Symptoms</p>
                  <p className='animate-fadeInSlow text-black text-sm'> {question}</p>
                 </div>
               
                 <div className={` ${activeStep !== 0 && "hidden"} w-full flex gap-28`}> 
                    <div className='h-3 w-[60%] rounded-full bg-gray-200'> </div>
                    <div className='h-3 w-[30%] rounded-full bg-gray-200'> </div> 
                 </div>
               
                 <div className={` ${false && "hidden"} w-full flex gap-8`}> 
                    <div className='h-3 w-[80%] rounded-full bg-gray-200'> </div>
                    <div className='h-3 w-[25%] rounded-full bg-gray-200'> </div> 
                 </div>

                 <div className={` ${false && "hidden"} w-full flex gap-40`}> 
                    <div className='h-3 w-[50%] rounded-full bg-gray-200'> </div>
                    <div className='h-3 w-[15%] rounded-full bg-gray-200'> </div> 
                 </div>

               
            
               </div>
               

             </div>
           </div> 
           
        
           <div className={` ${activeStep == 1 ? "hidden" : "hidden"} w-[80%]`} ref={logo} > </div>
           <div className={` ${activeStep == 2 ? "hidden" : "hidden"} w-[80%]`} ref={logo2} > </div>
           <div className={` ${activeStep == 3 ? "hidden" : "hidden"} w-[70%]`} ref={logo3} > </div>
         
        
         
        
         </div>


        {/* Bottom Buttons */}
        <div
          className={`absolute ${
            isPopupOpen && 'hidden'
          } w-screen  lg:w-1/2 lg:px-10 px-0  ${isDropdownSet && "lg:hidden flex"} lg:bottom-10 bottom-3   gap-3 lg:justify-end justify-center  flex items-center font-product animate-fadeIn`}>
          {/* Back Button */}
          {activeStep != 0 && (
      
        <button
              onClick={() => {
                setGlobalState('activeStep', activeStep - 1);
              }}
              className={` ${isDropdownSet && "flex"}  w-11 h-11  z-20 l  animate-leftToRight rounded-full bg-black flex items-center justify-center  text-white`}>
              {' '}
              <img
                width='20'
                height='20'
                src='https://img.icons8.com/metro/26/FFFFFF/chevron-left.png'
                alt='chevron-left'
              />
            </button>
          )}

      



          {/* Next Button */}
          <button
            onClick={() => {
              /* Sıgn Up Step*/

              //activeStep == 1 && handleSignup();

              /* Payment Step States */
              activeStep != 3 && setGlobalState('activeStep', activeStep + 1);
             // activeStep == 3 && setIsPopupOpen(true);
              !gV.mq.matches && activeStep == 3 && setGlobalState("isDropdownSet", true);

              (activeStep == 3 && isDropdownSet) && setIsPopupOpen(true);
              

              /* Payment Step */
              if (activeStep == 3) {
                AmountCalculator(mainPayAmount);

                setDoc(
                  doc(db, 'Medifyre', `${localStorage.getItem("mailAddress") }`),
                  {
                    Rechecks: [
                      {
                        formStep: activeStep,
                        activeStep: 1,
                        createDay: new Date().getDate(),
                        createMonth: new Date().getMonth(),
                        createYear: new Date().getFullYear(),
                        bodyParts: gV.bodyParts,
                        scanType: gV.scanType,
                        name: name,
                        mail: mail,
                        phone: phone,
                        question: question,
                        medicalSendType: dropdownText,
                        medicalCenter: medicalCenter,
                        insurance: gV.insuranceCompany,
                        isPay: false,
                        createdAt: Timestamp.now().toDate(),
                        doctors: doctors,
                        paymentPlan: paymentPlan,
                        payTotalWithoutTax: gV.payTotal,
                        password: gV.password,
                      },
                    ],
                  },
                  { merge: true },
                );
              }

              /* User and Info Logs */
              // console.log('BodyParts', gV.bodyParts);
              // console.log('ScanType', gV.scanType);
              // console.log('activeStep', activeStep, 'name', name, 'mail', mail, 'phone', phone);
              // user && console.log('user', user.email);
            }}
            className={`bg-black ${
              activeStep == 0 ? 'lg:w-[44%] w-[90%]  ' : 'lg:w-[46%] w-[70%] '
            } 
            
            z-20   duration-500 font-bold self-end float-right flex items-center justify-center  py-[9px] rounded-3xl text-white`}>
          
            Continue to {activeStep == 0 && 'History'} {activeStep == 1 && 'Medical Images '}{' '}
            {activeStep == 2 && 'Insurance'} {activeStep == 3 && 'Payment'} {activeStep == 4 && ''}
          </button>
        </div>
     
     
     
      </div>
    </>
  );
}
