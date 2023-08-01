import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";



import { MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";




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

export default function AccordionRecheck() {
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
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} >What is a recheck? </Typography>
        </AccordionSummary>


        <AccordionDetails>

          
          
            
             
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
             <p>Every year in the United States, more than 40,000 women's breast cancer cancers are missed on mammogram screenings due to human error. A recheck is the process in which two of our radiologists evaluate your mammograms separately with the use of artificial intelligence. We then compare the results of these evaluations and prepare a final report. You will either receive a report that confirms that your results are all clear, or you will receive a detailed report setting out any red flags for you to present to your doctor. </p>
        </div>

        
        
        </AccordionDetails>
    
    
    
      </Accordion>


      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} > Who will recheck my mammogram?</Typography>
        </AccordionSummary>


        <AccordionDetails>
       
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>We will assign two of our radiologists to carry out your mammogram recheck. The assignment criteria is based on radiologist availability and our system will make the assignment automatically.</p>
            <p>Our team consists of more than 80 radiologists, all of whom are US based and certified.</p>
         </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>


      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} >I had a mammogram screening, but I do not have copy of my mammogram, what should I do?</Typography>
        </AccordionSummary>


        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>It is always good to keep a copy of your mammograms with you for both a recheck and further screening comparisons. Please visit the <Link to="copy-mammogram" className="style none">
            <span>‘Getting a copy of your mammogram’ </span>
          </Link> page to learn how to acquire yours. However, for a recheck, we are able to acquire your mammogram from your medical centre if you provide us with your permission. To do this we will need you to complete a short digital form, which should only take a couple of minutes and can be found here.</p>
        
        </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }}>When will I get my recheck report?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>If you upload a digital copy of your mammogram we will deliver your final report within 24 hours. If you choose to ship a CD/USB stick containing your mammogram to us, or give us permission to acquire the mammograms from your medical centre, the final report will be completed within 24 hours of us receiving your mammogram.</p>
           
        </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} >What will my recheck report include?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
           <p> A recheck report includes three sections. </p>
           <p><span>1- General information </span>regarding breast symmetry and tissue density </p>
           <p><span>2- Overview of sensitive areas </span></p>
           <p><span>3- Detailed identification of red-flags </span>(including benign and malign tissues) if any are identified.</p>
           <p>If you have an all-clean mammogram then the report will include sections 1 and 2 above. If your mammogram indicates that there are some problems requiring a further mammogram screening, an ultrasound or a biopsy, the report will provide details of these problems at section 3 for your doctor to review. If you would like to see some sample reports,    <Link to="recheck-report-samples" className="style-none"> <span className="cursor-pointer"> please click here. </span> </Link>  </p>
        
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} >How much do I pay for a recheck?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>A recheck will only cost you $120. No additional payments, no extra charges.</p>
            <p>So, how is it possible to get your mammogram checked by two radiologists at that price? </p>
            <p>The answer is our technology. Without our artificial intelligence, an average radiologist would spend a minimum of 35 minutes on a recheck. However, with our artificial intelligence, a radiologist needs just 5 minutes to identify all possible calcifications, benign and malign cells, and other forms of breast complications. The less time it takes for a radiologist to perform the recheck, the less you pay.</p>
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>


      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18.6px", fontWeight: "600", letterSpacing:"-0px", color:"#000000"
          }} >Can I get a written copy of my recheck report?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
          <p>Your recheck report will be digitally signed by our radiologists, meaning you will not need a physical copy. However, if you want one, just drop us an e-mail at hello@vitamu.com, and we can send you a physical copy for free.</p>
        </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>


    </div>
  );
}

