import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom'


import { MdExpandMore } from "react-icons/md";





//#FBFBFB;

//açılan pencerenin içi ve bottom çizgiler
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "#FBFBFB",
  
  "&:not(:last-child)": {
    border:"none"
  },

  "&:before": {
    display: "inline"
  }
}));

// yandaki iconlar
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      
     <MdExpandMore className="accordion-icon"
    
     
     />
    }

    {...props}
  />

  //İÇ GENEL
))(({ theme }) => ({
    
  paddingRight: "0px",
  backgroundColor: "white;",
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
  backgroundColor: "white;",

  
}));


export default function MobileFooterCustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="mobile-footer-accordion">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{
              color: "#000000",
              fontFamily : "ProductSans-Light",
              fontSize: "17.6px",
              fontWeight: "500",
              display: "inline",
              width: "100%",

          }} >Facts</Typography>
        </AccordionSummary>

        <AccordionDetails>

          <ul  className="mobile-footer-accordion-list">
             
         
          <Link className="style-none" to="/human-error">  <li>Human Error</li> </Link>
          <Link className="style-none" to="/missed-diagnosis"><li>Missed Diagnosis</li> </Link>
          <Link className="style-none" to="/early-detection">  <li>Early Detection</li> </Link>
          <Link className="style-none" to="/statistics">   <li> Statistics</li> </Link>
          <Link className="style-none" to="/resources"> <li> Resources</li> </Link>
          
          
           </ul>
         
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{
              color: "#000000",
              fontFamily : "ProductSans-Light",
              fontSize: "17.6px",
              fontWeight: "500"

          }} >Recheck</Typography>
        </AccordionSummary>
       
        <AccordionDetails>
        <ul  className="mobile-footer-accordion-list">
             
         
        <Link  className="style-none" to="/how-works">  <li>How it Works</li> </Link>
        <Link  className="style-none" to="/technology">    <li>Technology</li></Link>
        <Link  className="style-none" to="/journey-mammogram">    <li>Journey of a Mammogram</li></Link>
        <Link  className="style-none" to="/what-next">   <li>What is Next? </li></Link>
        <Link  className="style-none" to="/radiology-team">   <li> Radiology Team</li></Link>
        <Link  className="style-none" to="/recheck-report-samples">      <li> Report Samples</li></Link>
             
             
              </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{
              color: "#000000",
              fontFamily : "ProductSans-Light",
              fontSize: "17.6px",
              fontWeight: "500"

          }}  >People</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ul  className="mobile-footer-accordion-list">
             
         
        <Link className="style-none" to="/our-story">     <li>Our Story</li> </Link>
        <Link className="style-none" to="/stories">    <li>Number</li> </Link>
        <Link className="style-none" to="/numbers">     <li>Stories</li> </Link>
        <Link className="style-none" to="/donate">    <li>Donate </li>  </Link>
        <Link className="style-none" to="/research-fund">   <li> Research Fund</li> </Link>
        <Link className="style-none" to="/join-team">      <li> Join the Team</li> </Link>
             
             
              </ul>
     
        </AccordionDetails>
      </Accordion>


      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{
              color: "#000000",
              fontFamily : "ProductSans-Light",
              fontSize: "17.6px",
              fontWeight: "500"

          }}  >Help</Typography>
        </AccordionSummary>
         <AccordionDetails>
         
            <ul  className="mobile-footer-accordion-list">
          
             <Link  className="style-none" to="/contact">   <li>Contact</li> </Link>
             <Link  className="style-none" to="/faq">  <li>FAQ</li> </Link>
             <Link  className="style-none" to="/stage-4-support">   <li>Stage 4 Support</li> </Link>
             <Link  className="style-none" to="/copy-mammogram"><li>Getting a Copy of Yout Mammogram </li> </Link>
             
              </ul>
     
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

