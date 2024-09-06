import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./style/someQuestion.css";
import { Link } from 'react-router-dom'
import { MdExpandMore } from "react-icons/md";
var mq = window.matchMedia( "(max-width: 1080px)" );




//#FBFBFB;

//açılan pencerenin içi ve bottom çizgiler
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  
  
   
  
  "&:not(:last-child)": {
    borderBottom:"gray",
  },

  "&:before": {
    display: "inline",
    
  }
}));

// yandaki iconlar
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
   sx={{
    height:"5vh",
    position:"relative",
    right:"12px",
    fontSize:"26px",
    
   }}
    expandIcon={
      
     <MdExpandMore style={{color:"#000000"}} className="accordion-icon"
    
     
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
   
    marginLeft: theme.spacing(0),
  
  }
}));

//iç METİN
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: "1px",}));



export default function AccordionSomeQuestion({width}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <div
    className="accordionn-some-question"
    style={{ zIndex:"1",width:width, display:"flex", flexDirection:"column", gap:"0px"}}    >


      <Accordion
        
        onChange={handleChange("panel1")}  >
     
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  style={{paddingBlock:"32px"}} >
          <Typography style={{ color:"#000000", fontFamily : "ProductSans-Light", fontSize: "17px",  lineHeight:"25px", letterSpacing:"0.6px"
          }} >For general questions about breast health</Typography>
        </AccordionSummary>


        <AccordionDetails  >
        
        <p style={{display:"flex", flexDirection:"row",width:"100%", gap:"4px", color:"gray"}} className="normal-text">Visit <Link className="style-none" to="/resources"><span style={{fontFamily:"ProductSans-Thin"}}>Resources</span></Link> </p>

        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{paddingBlock:`${mq.matches ? "32px" : "28px" }`}}>
        <Typography style={{ color:"#000000", fontFamily : "ProductSans-Light", fontSize: "17px",  lineHeight:"25px", letterSpacing:"0.6px"
       
         
          }} >For general questions about recheck</Typography>
        </AccordionSummary>


        <AccordionDetails>
        
        <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
          <p style={{display:"flex", flexDirection:"row",width:"100%", gap:"6px", color:"rgb(101, 101, 101)"}} className="normal-text">Visit <Link to="/faq" className="style-none"><span  style={{fontFamily:"ProductSans-Thin"}}>Frequently Asked Questions.</span></Link></p>
          <p style={{color:"gray"}} className="normal-text" >or</p>
          <p style={{display:"flex", flexDirection:"row",width:"100%", gap:"6px", color:"gray"}} className="normal-text">Drop us an-mail: <a className="style-none"  href="mailto:hello@medifyre.com"><span  style={{fontFamily:"ProductSans-Thin"}}>hello@medifyre.com</span> </a>  </p>

        </div>


        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{paddingBlock:"32px"}}>
        <Typography style={{ color:"#000000", fontFamily : "ProductSans-Light", fontSize: "17px",  lineHeight:"25px", letterSpacing:"0.6px"

       
         
          }} >Want to talk to a radiologist before recheck?</Typography>
        </AccordionSummary>


        <AccordionDetails>
        <p style={{display:"flex", flexDirection:"column",width:"100%", gap:"0", color:"rgb(101, 101, 101)"}} className="normal-text">Understood. Drop us an e-mail at:  <a className="style-none"  href="mailto:radiologist@medifyre.com"><span style={{fontFamily:"ProductSans-Thin"}}>radiologist@medifyre.com</span></a> </p>
        <p style={{marginTop:"15px",color:"rgb(101, 101, 101)",width:"100%"}} className="normal-text">You will get a response in 24 hours. </p>

        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{ color:"#000000", fontFamily : "ProductSans-Light", fontSize: "17px",  lineHeight:"25px", letterSpacing:"0.6px"

        
          }} >Want to read recheck stories?</Typography>
        </AccordionSummary>


        <AccordionDetails>
        
        <p style={{marginTop:"15px",color:"rgb(101, 101, 101)",width:"100%"}} className="normal-text">We recheck more than +100.000 mammograms each year, and here are patient stories. Real ones.  </p>
        <p style={{marginTop:"10px",display:"flex", flexDirection:"row",width:"100%", gap:"6px", color:"rgb(101, 101, 101)"}} className="normal-text">Click <span style={{fontFamily:"ProductSans-Thin"}}>Here</span></p>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

    
      



   





    </div>
  );
}

