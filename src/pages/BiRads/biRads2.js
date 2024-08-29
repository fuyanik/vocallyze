import React, { useEffect, useState } from 'react'
import "./style/biRads.css"
import { Link } from 'react-router-dom'
import Navbar from '../../homeComponents/1.Navbar/navbar'
import SomeQuestion from './components/someQuestion'
import Footer from '../../homeComponents/11.Footer/footer'
import MobileFooter from '../../homeComponents/22.MobileFooter/mobileFooter'
import gV from '../../gV'
import { setGlobalState } from '../../hookState'
import SliderStepper from '../../homeComponents/SliderStepper/sliderStepper'
import Testom from '../../homeComponents/WomenSpeak/testom'
import Radiologists from '../../homeComponents/7.Radiologists/radiologists'
import Popup from '../Popup/popup'
import DropdownHeader from '../DropdownPages/components/Header'
import { Helmet } from 'react-helmet';









const BiRads2 = () => {

  gV.p = 0;
  gV.i = 0;
  gV.biRads = "";
  gV.isShowBiRads123 = true;
  var mq = window.matchMedia("(max-width: 1080px)");
  gV.navigation = "biRads3";

  setGlobalState("isPayScreen", false);

  const [isShowFooter, setIsShowFooter] = useState(false);
  const [scroll, setScroll] = useState(0);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //scroll event listener for mobile mobile mobile
  window.addEventListener("scroll", function () {
    setScroll(window.pageYOffset);

  });


  //when user scrroll top run function  

  useEffect(() => {
    if (scroll > 400) {
    
        setIsShowFooter(true) 
       
    }

    if (scroll < 400 && scroll > 200) {
      setIsShowFooter(false);
    }
 
 
  }, [scroll]);
 
 
  //Close popup page
  //...
  function onDismiss() {
    setIsPopupOpen(false);
  }


 



  return (
    <div
      onClick={() => {
        isPopupOpen && setIsPopupOpen(false);
      }}
      className={`${isPopupOpen ? "Swiper-Page-blur" : "birads-full"}`}
    >
      <Helmet>
        <title>Birads - 2</title>
        <meta name="description" content="Birads - 2" />
      </Helmet>

      <Popup
        open={isPopupOpen}
        onDismiss={onDismiss}
        contents={
          <>
            {" "}
            <h1 style={{ marginLeft: "36vw" }}>Popup</h1>
          </>
        }
      />

      <div className="birads">
        <Navbar mobileMenuText={"Menu"} mobileMenuTo={"/mobileNavMenu"} />

        {/*  Bi-Rads Left Main Area*/}
        <div className="bi-rads">
          <DropdownHeader
                yellow_title="We recheck mammograms/ultrasounds/breast MRIs."
            title="Have some questions about Birads 2?"
            subtitle="You got your screening for peace of mind but ended up with some vague term of Birads 2. I am Elizabeth H. Asch, a US board-certified radiologist, and I will try to answer all the questions on your mind. It will take only two minutes to read this piece; please make it to the end."
            writer="Elizabeth H. Asch, MD"
            date="Updated on February 12, 2023"
            checker="Priscilla J Slanetz, MD"
          />

          <div style={{ width: "100%" }} className="bi-rads__main normal-text">

             <p>If you receive a Bi-rads 2 score this means that the result on your mammogram/ultrasound is negative (meaning there is no sign of cancer), but the radiologist has identified other benign findings in the breast such as benign <Link to="/calcification"><span>calcifications</span></Link>, <Link to="/breast-cyst"><span>cysts</span></Link>, or<Link to="/fibroadenoma"> <span>fibroadenomas</span></Link>.</p>
             <p>However, there is a human error risk present, as always. Your mammogram, ultrasound, or breast MRI was evaluated by a single radiologist. The problem is that we, radiologists, even the most experienced ones, miss 12% of breast cancer cases because they are human beings. The root cause of this problem varies, including heavy workload, lack of expertise in breast cancer detection, and uniqueness of cancer cells and tissues. </p>
             <p>If there are some suspicious areas in your breast that your radiologist missed, then that mass will be detected at least one year later. </p>
             
             <p><span>How we help.</span></p>
             <p>At Vitamu, we are a team of 30+ U.S. board-certified <Link to="radiology-team"><span>radiologists</span></Link>, and we recheck your mammograms, ultrasounds, and breast MRIs to ensure you are breast cancer free. Once you get started, two of our radiologists will evaluate your medical images separately with the help of our artificial intelligence. Suppose a red flag (i.e., a potential case of cancer) is reported by either of these radiologists or by our artificial intelligence, we will arrange for you to have a physical examination at one of our partner locations.</p>
             <p>If nothing concerning is found during the review of your mammograms/ultrasounds, we will inform you that you are breast cancer free. The whole process will take just 24 hours from when we receive the copy of your mammogram/ultrasound.</p>
             <p>You will get a detailed imaging <span>report</span> with clear explanations in either case. </p>
             <p>All our radiologists are U.S. board certified and have degrees from top-tier schools in the United States. A recheck costs $120 and is as low as $20 if you have an active insurance plan. </p>
          
          
            <Link style={{ textDecoration: "none" }} to="/form">
              <a
                onClick={() => {
                  gV.biRads = "2";
                  gV.p = 0;
                  gV.isShowBiradsPage = false;
                }}
                style={{ width: "258px", height: "46px" }}
                className="button"
              >
                <p style={{ fontSize: "17px" }} className="buttonText">
                  {" "}
                  Recheck Today
                </p>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeigh: "700",
                    marginTop: "5px",
                  }}
                  className="line"
                >
                  |
                </p>
                <p className="arrow">➔</p>
              </a>
            </Link>


          </div>
        </div>

        {/*  Bi-Rads Right Side Area*/}

        <div className="bi-rads__right">
          <div className="bi-rads__right__header">
            <div className="bi-rads__right__header__left">
              <p>Elizabeth H. Asch</p>
              <p>Harvard Medical School'09</p>
              <p>Diagnostic Radiology</p>
            </div>

            <img
              className="bi-rads__right__header__image"
              src="https://vitamu.imgix.net/radiologyRe/Elizabeth%20H.%20Asch-Mobile.png?w=1001&h=1000&auto=undefined%2Ccompress"
            />
          </div>

          <div className="bi-rads__right__main">
            <div className="bi-rads__right__main__divider"> </div>
            <br></br>

            <div className="bi-rads__right__main__card">
              <div className="bi-rads__right__main__card__header">
                <p className="bi-rads__right__main__card__header__title">
                  Vitamu April 2023 Numbers:
                </p>
                <div className="bi-rads__right__main__card__header__area">
                  <p>2.317 rechecks
 </p>
                  <p>237 cancer cases caught
</p>
                  <p>416 changes in Birads scores
</p>
                </div>
                <div className="bi-rads__right__main__card__header__divider"></div>
              </div>

              <div>
                <p className="bi-rads__right__main__card__text">856 265-0362</p>
                <p className="bi-rads__right__main__card__text">
                  hello@Medifyre.com
                </p>
              </div>
            </div>
          </div>

          {/* Right İnfo Area  */}

          <div
            data-aos="fade-left"
            data-aos-duration="800"
            className="bi-rads__right__info"
          >
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <div className="bi-rads__right__info__circle"></div>
              <div className="bi-rads__right__info__line"></div>
            </div>

            <p>Did you know?</p>
            <p>
              Overall, 10% of breast cancer cases are missed on a single breast
              screening by radiologists.
            </p>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="900"
            className="bi-rads__right__info"
          >
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <div className="bi-rads__right__info__circle"></div>
              <div className="bi-rads__right__info__line"></div>
            </div>

            <p>Did you know?</p>
            <p>
              A triple check of your medical images eliminates the human error
              risk, resulting in 100% accuracy in diagnosis.
            </p>
          </div>

          {/* Right Blur  */}
          <div className="bi-rads__right__blur"></div>
        </div>

        {/* Mobile Fixed Get Started Button */}
        {gV.mq.matches && (
          <div
            // style={{ display: gV.mq.matches && isShowFooter ? "flex" : "none" }}
            onClick={() => {
              gV.biRads = 3;
            }}
            className={` ${
              gV.mq.matches && isShowFooter
                ? "bi-rads__footer"
                : "bi-rads__footerRev"
            } `}
          >
            <Link style={{ textDecoration: "none" }} to="/form">
              <div
                onClick={() => {
                  gV.biRads = "3";
                  gV.p = 0;
                  gV.isShowBiradsPage = false;
                }}
                className="bi-rads__footer__button"
              >
                <p>Get Started</p>
                <span className="line">|</span>
                <span className="arrow">➔</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      <br></br>
      <br></br>

      <div className="w-[100vw]  items-center lg:gap-12  flex flex-col ">
        <Radiologists isBiradsPage={true} isTeamPage={false} />
        <SomeQuestion />
        <SliderStepper />
        <Testom />
      </div>

      {mq.matches ? <MobileFooter /> : <Footer marginTop={"3vh"} />}
    </div>
  );
}


export default BiRads2;