import "./radiologists.css"





import { useState } from "react";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV"
import { Link } from "react-router-dom";

const Radiologists = ({isOutside = false, isTeamPage = false} ) => {

    const [isHover, setIsHover] = useState(false);

   

    const radiologistsHome = [
   

      {
        name: "Pamela J. DiPiro",
       
        school: " Tufts University School of Medicine",
      
        field: "Diagnostic Radiology",
        experience: "33",

        img:"https://vitamu.imgix.net/radiologyRe/Pamela%20J.%20DiPiro.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyRe/Pamela%20J.%20DiPiro-Mobile.png?auto=undefined%2Ccompress"

      },

      {
        name: "Roy Zimmer",
        school: "Medical College of Wisconsin",
        field: "Diagnostic Radiology",
        experience: "33",

        img:"https://vitamu.imgix.net/radiologyTeam/Roy%20Zimmer.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Roy%20Zimmer-Mobile.png?auto=undefined%2Ccompress"

      },

     
      {
        name: "Priscilla J Slanetz",
        school: "Harvard Medical School",
        field: "Diagnostics Radiology",
        experience: "31",

        img:"https://vitamu.imgix.net/radiologyRe/Priscilla%20J%20Slanetz.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyRe/Priscilla%20J%20Slanetz-Mobile.png?auto=undefined%2Ccompress"

      },

      

      {
        name: "Tanya J. Rath",
        school: "University of Michigan",
        field: "Diagnostic Radiology",
        experience: "17",

        img:"https://vitamu.imgix.net/radiologyTeam/Tanya%20J.%20Rath.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Tanya%20J.%20Rath-Mobile.png?auto=undefined%2Ccompress"

      },

   
    ]

    const radiologists = [
       
      {
        name: "Jason Sinner",
        school: "Finch University",
        field: "Diagnostic Radiology",
        experience: "19",

        img:"https://vitamu.imgix.net/radiologyTeam/Jason%20Sinner.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Jason%20Sinner-Mobile.png?auto=undefined%2Ccompress"

      },

    
    
       
      {
        name: "Stacey Akua Kontoh",
       
        school: "Yale School of Medicine",
      
        field: "Diagnostic Radiology",
        experience: "17",

        img:"https://vitamu.imgix.net/radiologyTeam/Stacey%20Akua%20Kontoh.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Stacey%20Akua%20Kontoh-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Carleton Albert Allen",
       
        school: "Yale School of Medicine",
      
        field: "Diagnostic Radiology",
        experience: "22",

        img:"https://vitamu.imgix.net/radiologyTeam/Carleton%20Albert%20Allen.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Carleton%20Albert%20Allen-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Yasmin Clark",
       
        school: "Rutgers New Jersey Medical School",
      
        field: "Diagnostic Radiology",
        experience: "20",

        img:"https://vitamu.imgix.net/radiologyTeam/Yasmin%20Clark.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Yasmin%20Clark-Mobile.png?auto=undefined%2Ccompress"

      },

      {
        name: "Derek Mason",
        school: "New York Medical College",
        field: "Diagnostic Radiology, Breast Imaging",
        experience: "20",

        img:"https://vitamu.imgix.net/radiologyTeam/Derek%20Mason.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Derek%20Mason-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Abraha Taddese",
        school: "Harvard Medical School",
        field: "Diagnostic Radiology",
        experience: "18",

        img:"https://vitamu.imgix.net/radiologyTeam/Abraha%20Taddese.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Abraha%20Taddese-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Christa Lynn Catalano",
        school: "Boston University School of Medicine",
        field: "Diagnostic Radiology",
        experience: "23",

        img:"https://vitamu.imgix.net/radiologyTeam/Christa%20Lynn%20Catalano.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Christa%20Lynn%20Catalano-Mobile.png?auto=undefined%2Ccompress"

      },

   
      {
        name: "Jody B Stucky",
        school: "Kansas School of Medicine",
        field: "Diagnostic Radiology, Interventional Radiology",
        
        experience: "15",

        img:"https://vitamu.imgix.net/radiologyTeam/Jody%20B%20Stucky.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Jody%20B%20Stucky-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Angela Marie Fried",
        school: "Louisiana State University School of Medicine",
        field: "Diagnostic Radiology",
        experience: "16",

        img:"https://vitamu.imgix.net/radiologyTeam/Angela%20Marie%20Fried.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Angela%20Marie%20Fried-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "James Lin",
        school: "Tufts University School of Medicine",
        field: "Diagnostics Radiology",
        experience: "19",

        img:"https://vitamu.imgix.net/radiologyTeam/James%20Lin.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/James%20Lin-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Toby Washington",
        school: "University of New Mexico School of Medicine",
        field: "Diagnostic Radiology",
        experience: "18",

        img:"https://vitamu.imgix.net/radiologyTeam/Toby%20Washington.png?w=1000&h=1200&auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Toby%20Washington-Mobile.png?w=1000&h=1200&auto=undefined%2Ccompress"

    },
      {
        name: "Emily S. Nia",
        school: "University of Texas",
        field: "Diagnostic Radiology",
        experience: "16",

        img:"https://vitamu.imgix.net/radiologyTeam/Emily%20S.%20Nia.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Emily%20S.%20Nia-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Ethan O. Cohen",
        school: "University of Texas Southwestern Medical School",
        field: "Diagnostic Radiology",
        experience: "18",

        img:"https://vitamu.imgix.net/radiologyTeam/Ethan%20O.%20Cohen.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Ethan%20O.%20Cohen-Mobile.png?auto=undefined%2Ccompress"

      },
     
      {
        name: "Anna Maria Weissmann",
        school: "Jagiellonian University Medical College",
        field: "Diagnostic Radiology",
        experience: "21",

        img:"https://vitamu.imgix.net/Anna%20Maria%20Weissmann.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Anna%20Maria%20Weissmann-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Jill Stacey Gluskin",
        school: "Tufts University School of Medicine",
        field: "Diagnostic Radiology",
        experience: "16",

        img:"https://vitamu.imgix.net/radiologyTeam/Jill%20Stacey%20Gluskin.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Jill%20Stacey%20Gluski-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Arvin Bhushan Kheterpal",
        school: "Rutgers Robert Wood Johnson Medical  School",
       
        field: "Diagnostic Radiology",
        experience: "12",

        img:"https://vitamu.imgix.net/radiologyTeam/Arvin%20Bhushan%20Kheterpal.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/Arvin%20Bhushan%20Kheterpal-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Kitt Shaffer ",
       
        school: "Kansas Medical School",
        field: "Diagnostic Radiology",
        experience: "29",

        img:"https://vitamu.imgix.net/radiologyRe/Kitt%20Shaffer.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyRe/Kitt%20Shaffer-Mobile.png?auto=undefined%2Ccompress"

      },
   
     
      {
        name: "Kevin P Daly",
        school: "Medical College of Georgia",
        field: "Diagnostic Radiology",
        experience: "24",

        img:"https://vitamu.imgix.net/radiologyRe/Kevin%20P%20Daly.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyRe/Kevin%20P%20Daly-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Elizabeth H. Asch",
        school: "Harvard Medical School",
        
        field: "Diagnostic Radiology",
        experience: "13",

        img:"https://vitamu.imgix.net/radiologyRe/Elizabeth%20H.%20Asch.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyRe/Elizabeth%20H.%20Asch-Mobile.png?auto=undefined%2Ccompress"

      },
      {
        name: "Regina Maria Koch",
        school: "Ruprecht Karls University",
        
        field: "Diagnostic Radiology",
        experience: "14",

        img:"https://vitamu.imgix.net/radiologyRe/Regina%20Maria%20Koch.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyRe/Regina%20Maria%20Koch-Mobile.png?auto=undefined%2Ccompress"

      },
    
     
    
      {
        name: "Gregg A. Miller",
        school: "Case Western Reserve University School of Medicine",
        field: "Diagnostic Radiology",
        experience: "23",

        img:"https://vitamu.imgix.net/radiologyTeam/Gregg%20A.%20Miller.png?auto=undefined%2Ccompress",
        img_mob:"https://vitamu.imgix.net/radiologyTeam/Gregg%20A.%20Miller-Mobile.png?auto=undefined%2Ccompress"

      },
  ];


    //test log
return (
  <div className="main self-center lg:relative lg:bottom-10">
    
    <div className="text3 self-start ml-3"> OUR RADIOLOGY TEAM</div>
    <div className="text0">Two of us will recheck your <div className="w-fit inline "><p className="w-fit inline">mammogram</p></div> to make sure you are not misdiagnosed or overdiagnosed. </div>

    <div className="text3 self-start ml-3"> Swipe right to see more</div>
    <div className="doctor-main">
      <div className="text1 hidden"> OUR RADIOLOGY TEAM</div>
      <div className="text2">
        We are a team of U.S. board-certified radiologists. Two of us will
        recheck your radiology images to make sure you are not misdiagnosed or overdiagnosed.{" "}
      </div>

      <div className="doctor-section">

        {radiologistsHome.map((item, index) => (
              <div key={index} className="doctor-section__item ">
                <img
                  class={`doctor-img-mobile ${index == 8 ? "" : ""}`}
                  srcset={gV.mq.matches ? item.img_mob : item.img }
                />
                <h5 className="mob-docName"> {item.name}</h5>
                <p className="mob-schName">
                  {item.school} 
                </p>
                <p className="mob-exp"> {item.field} </p>
                <p className="mob-exp"> {item.experience + " Years of Experience" }</p>
              </div>
            ))}

        {isTeamPage && (
          <>
            {radiologists.map((item, index) => (
              <div key={index} className="doctor-section__item ">
                <img
                
                  class={`doctor-img-mobile ${index == 8 ? "mr-10" : ""}`}
                  srcset={gV.mq.matches ? item.img_mob : item.img }
                />
                <h5 className="mob-docName"> {item.name}</h5>
                <p className="mob-schName">
                  {item.school} 
                </p>
                <p className="mob-exp"> {item.field} </p>
                <p className="mob-exp"> {item.experience + " Years of Experience" }</p>
              </div>
            ))}
           
          </>
        )}
      </div>
    </div>

    <div className="radiologist-footer">
      <p className="textBottom">
        We have 30+ certified radiologists in our team.{" "}
      </p>
      
      <div
       className=" flex relative items-center justify-center  "
      
      >
        {isHover && (
          <BiRadsDropdown
             top={gV.mq.matches ? "-360%" : "-90%"}
          
             onMouseLeave={() => setIsHover(false)}
           
          />
        )}

        <PrimaryButton  onMouse={() => setIsHover(true)} />
      
      </div>
    { isOutside &&  <Link to={"/radiology-team"}>
        <div className="px-6 hover:bg-black hover:text-white duration-500 py-2 relative bottom-3 lg:bottom-0 flex items-start justify-center font-product  border self-center border-black rounded-full text-black"> Meet the Team</div>
      </Link>}
    </div>
  </div>
);


}

export default Radiologists;