import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";



import { MdExpandMore } from "react-icons/md";




//#FBFBFB;

//açılan pencerenin içi ve bottom çizgiler
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  
  
  
  
  "&:not(:last-child)": {
    borderBottom:"1px solid #000000",
  },

  "&:before": {
    display: "inline",
    
  }
}));

// yandaki iconlar
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
   sx={{
    height:"fit-content"
   }}
    expandIcon={
      
     <MdExpandMore className="accordion-icon"
    
     
     />
    }

    {...props}
  />

  //İÇ GENEL
))(({ theme }) => ({
  
  paddingRight: "0px",
 
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)"
  },
  "& .MuiAccordionSummary-content": {
   
    marginLeft: theme.spacing(-2),
  
  }
}));

//iç METİN
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: "1px",

  
}));

const YellowButton = ({text}) => {
    return(
        <div className="accordions-yellow-button">  
           {text}
        </div>
    )
 }

export default function AccordionPrivacy() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  return (
    <div
    className="mui-widthh"
    >



      <Accordion
        
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }} >What is HIPAA Compliance and which systems do you use for mammogram rechecks? </Typography>
        </AccordionSummary>


        <AccordionDetails>

          
          
            
             
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
          <p>The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for sensitive patient data protection. Companies that deal with protected health information (PHI) must have physical, network, and process security measures in place and follow them to ensure HIPAA Compliance. </p>
          <p>Here at Vitamu, everything you do on our website is HIPAA compliant and the systems/services we use are also HIPAA compliant. While processing your mammograms for recheck, we use HIPAA compliant Amazon Web Services servers. During the journey of your mammogram recheck, the first step we take is to anonymise your mammogram, so that neither our radiologists or any other team member will know your name.</p>
         </div>

        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }} >Do you store healthcare records or recheck results?</Typography>
        </AccordionSummary>


        <AccordionDetails>
       
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p>We never store the files you upload or your recheck reports without your consent. If you do not give us permission to keep your records, the mammograms and reports are kept on Amazon Web Services servers for 24 hours and then deleted permanently.</p>
         </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>


      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }} >Myth: A mammogram can caouse breast cancer to spread</Typography>
        </AccordionSummary>


        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p><span>Here’s the Truth</span></p>
           <p>A mammogram, or x-ray of the breast, currently remains the gold standard for the early detection of breast cancer. Breast compression while getting a mammogram cannot cause cancer to spread. According to the National Cancer Institute, “The benefits of mammography, however, nearly always outweigh the potential harm from the radiation exposure. Mammograms require very small doses of radiation. The risk of harm from this radiation exposure is extremely low.”</p>
           <p>The standard recommendation is an annual mammographic screening for women beginning at age 40. Base your decision on your physician’s recommendation and be sure to discuss any remaining questions or concerns you may have with your physician.</p>
         </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }}>Myth: If you have a family history of breast cancer, you are likely to develop breast cancer, too</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p><span>Here’s the Truth</span></p>
           <p>While women who have a family history of breast cancer are in a higher risk group, most women who have breast cancer have no family history. Statistically only about 10% of individuals diagnosed with breast cancer have a family history of this disease.</p>
           <p style={{marginLeft:"28px"}}>• If you have a first degree relative with breast cancer: If you have a mother, daughter, or sister who developed breast cancer below the age of 50, you should consider some form of regular diagnostic breast imaging starting 10 years before the age of your relative’s diagnosis.</p>
           <p style={{marginLeft:"28px"}}>• If you have a second degree relative with breast cancer: If you have had a grandmother or aunt who was diagnosed with breast cancer, your risk increases slightly, but it is not in the same risk category as those who have a first degree relative with breast cancer.</p>
           <p style={{marginLeft:"28px"}}>• If you have multiple generations diagnosed with breast cancer on the same side of the family, or if there are several individuals who are first degree relatives to one another, or several family members diagnosed under age 50, the probability increases that there is a breast cancer gene contributing to the cause of this familial history.</p>
         
         
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }} >Breast cancer is contagious</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p><span>Here’s the Truth</span></p>
           <p>You cannot catch breast cancer or transfer it to someone else’s body. Breast cancer is the result of uncontrolled cell growth of mutated cells that begin to spread into other tissues within the breast. However, you can reduce your risk by practicing a healthy lifestyle, being aware of the risk factors, and following an early detection plan so that you will be diagnosed early if breast cancer were to occur.</p>
           
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }} >If the gene mutation BRCA1 or BRCA2 is detected in your DNA, you will definitely develop breast cancer</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p><span>Here’s the Truth</span></p>
           <p>According to the National Cancer Institute, regarding families who are known to carry BRCA1 or BRCA2, “not every woman in such families carries a harmful BRCA1 or BRCA2 mutation, and not every cancer in such families is linked to a harmful mutation in one of these genes. Furthermore, not every woman who has a harmful BRCA1 or BRCA2 mutation will develop breast and/or ovarian cancer. But, a woman who has inherited a harmful mutation in BRCA1 or BRCA2 is about five times more likely to develop breast cancer than a woman who does not have such a mutation.” For people who discover they have the harmful mutation, there are various proactive measures that can be done to reduce risk. These include taking a hormonal therapy called Tamoxifen or deciding to take a surgical prevention approach which is to have bilateral prophylactic mastectomies, usually done with reconstruction. Most women will also have ovaries and fallopian tubes removed as well since there is no reliable screening test for the early stages of developing ovarian cancer.</p>
           
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>


      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px",fontWeight: "300", color:"#000000" 
          }} >Myth: Antiperspirants and deodorants cause breast cancer</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p><span>Here’s the Truth</span></p>
           <p>Researchers at the National Cancer Institute (NCI) are not aware of any conclusive evidence linking the use of underarm antiperspirants or deodorants and the subsequent development of breast cancer.</p>
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>



   





    </div>
  );
}

