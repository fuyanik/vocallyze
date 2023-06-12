const gV = 
 {
    a: 0,
    b: 0,


    //help page index for div height
    i: 0,
   
    //help payment screen navigate
    p: 0,

   //User information from the form, it is used to send the data to the server with backedn
  
    //CARD1
    userName: "none",
   
    //CARD2
    age: 35,
    
    //CARD3
    appliestTo: [""],
    showAppliesText: [],

    //CARD4
    biRads: "none",
    isShowBiRads123: true,

    //CARD5
    doYouHave: ["none"],
    isUserClickOtherAnswer: false,
    otherAnswer: "none",
  
    //CARD6
    MailAddres:"none",    

    //CARD PASSWORD
    password: "",

    //CARD7
    isHaveDigitalCopy: "none",

    //CARD8
    preferTo: "none",

    //CARD9
    isHaveImages: false,
    zipUrls: [],
    imagesName: [],


    //CARD11
    medicalCenterName: "none",
   
   
    //USER PANEL
    activeStep: 0,
    imagesUrl: [],
    
 

    //INSURANCE
    insuranceCompany: "Cigna",
    phoneNumber: 0,

    insuranceText: "none",


    //PAYMENT
    payAmount: 0,
    payPlan: "one",
    payTotal: 10,
    payType:"firstRecheck",
            //secondRecheck
            //user panel

    discountPercent: 0,
    discountAmount: 0,
    



    //birads dropdown menu
    navigation: "home",

    currentDate: "",
    currentDate2: "",
    


    isShowBiradsPage: true,
    mq : window.matchMedia( "(max-width: 1080px)" ),

    geoData: {},

    
}

export default gV;
