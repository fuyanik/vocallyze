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

          }} >Services</Typography>
        </AccordionSummary>

        <AccordionDetails>

          <ul  className="mobile-footer-accordion-list">
             
         
          <Link className="style-none" to="/mri">  <li>MRI</li> </Link>
          <Link className="style-none" to="/mammogram"><li>Mammogram</li> </Link>
          <Link className="style-none" to="/ultrasound">  <li>Ultrasound</li> </Link>
          <Link className="style-none" to="/ct">   <li> Ct Scan</li> </Link>
          <Link className="style-none" to="/x-ray"> <li> X-Ray</li> </Link>
          <Link className="style-none" to="/full-body"> <li> Full Body Scan</li> </Link>
          <Link className="style-none" to="/pregnancy"> <li> Pregnancy</li> </Link>
     
          
          
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

          }} >About</Typography>
        </AccordionSummary>
       
        <AccordionDetails>
        <ul  className="mobile-footer-accordion-list">
             
         
        <Link  className="style-none" to="/how-works">  <li>How It Works</li> </Link>
        <Link  className="style-none" to="/why-second-opinion">  <li>Why Second Opinion</li> </Link>
        <Link  className="style-none hidden" to="/radiology-team">    <li>Radiology Team</li></Link>
        <Link  className="style-none" to="/">    <li>Sample Reports</li></Link>
        <Link  className="style-none" to="/contact">   <li>Help </li></Link>
        <Link  className="style-none" to="/radiology-team">   <li> FAQ</li></Link>
        <Link  className="style-none" to="/recheck-report-samples">      <li> Report Samples</li></Link>
             
             
              </ul>
        </AccordionDetails>
      </Accordion>
  
    </div>
  );
}

