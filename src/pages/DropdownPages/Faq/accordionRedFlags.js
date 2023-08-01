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

export default function AccordionRedFlags() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  return (
    <div  className="mui-widthh">

      <Accordion
        
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000", color:"#000000"
          }} >What should I do if there are red-flags?</Typography>
        </AccordionSummary>


        <AccordionDetails>
            
             
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p>If there are any red flags, your report will have a clear warning stating "Show this report to your physician or radiologist immediately". If this is the case, you must give your recheck report to your physician as soon as possible.</p>
        </div>

        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} > Can I talk to one of your radiologists</Typography>
        </AccordionSummary>


        <AccordionDetails>
       
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>If you have any special requests before, during, or after the recheck process, you can talk to your assigned radiologists. Drop us an e-mail at <span>hello@vitamu.com</span>, and we can arrange this for you.</p>
        </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} >Should I give the report to my physician?</Typography>
        </AccordionSummary>


        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
         <p>If your recheck report states that the score of your mammogram result is BI-RADS 1 then you are breast cancer-free, and you do not have to give your recheck report to your physician.</p>
         <p>However, if there are any red flags, your report will have a clear warning stating "Show this report to your physician or radiologist immediately". If this is the case, you must give your recheck reports to your physician as soon as possible.</p>
        
        </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

  { /*   <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }}>What</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>If you upload a digital copy of your mammogram we will deliver your final report within 24 hours. If you choose to ship a CD/USB stick containing your mammogram to us, or give us permission to acquire the mammograms from your medical centre, the final report will be completed within 24 hours after we have received the mammogram.</p>
           
        </div>
        
     
        </AccordionDetails>
      
      
        </Accordion> */}


    

    </div>
  );
}

