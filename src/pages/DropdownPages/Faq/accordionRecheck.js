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
    borderBottom:"1px solid #E5E5E5",
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

export default function AccordionRecheck({isOutside = false}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  return (
    <div
    className="mui-widthh"
    >




      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#000000"
          }} > I had a screening, but I do not have a copy of my images. What should I do?</Typography>
        </AccordionSummary>


        <AccordionDetails>
       
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>It is always good to keep a copy of your images with you for both a recheck and further screening comparisons. However, for a second opinion, we are able to acquire your images from your medical center if you authorize us. </p>
            <p>Please choose “I authorize you to acquire my images” when filling out the form. Please keep that in mind, your imaging center will call you for confirmation.</p>
         </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>


      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#000000"
          }} >When will I get my second opinion report?</Typography>
        </AccordionSummary>


        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>If you upload a digital copy of your images, we will deliver your final report within 24 hours. If you choose to ship a CD/USB stick containing your images to us or give us permission to acquire the images from your medical center, the final report will be completed within 24 hours of us receiving your images.
          </p>
        
        </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#000000"
          }}>What will my second opinion report include?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>It will include four sections.	</p>
          <p>
A summary card: An overview of your personal history and our findings.	
Detailed case analysis: A list of normal and abnormal findings in your images.	
Radiologist notes: Explanatory notes from your dedicated radiologist to make you understand the case in detail.	
Marked images: Markings in the suspicious areas in your images.</p>

<p>What to see sample reports?</p>
<Link to={"/sample-reports"}>
               <div class= " px-5 py-3 bg-black hover:bg-sec duration-500 rounded-full   w-fit text-white tracking-wider text-sm cursor-pointer">See Sample Report</div>
             </Link>


           
        </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#000000"
          }} >How much will I pay for a second opinion report?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
          <p>A recheck will only cost you $199. No additional payments, no extra charges. We accept major insurance plans, and most of our users pay less than $60 for a second opinion report.</p>
        
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#000000"
          }} >Can I get a written copy of my second opinion report?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>Your report will be digitally signed by our radiologists, meaning you will not need a physical copy. However, if you want one, just drop us an e-mail at <a className="style-none"  href="mailto:hello@mitrua.com"> <span>hello@mitrua.com</span> </a> , and we can send you a physical copy for free.</p>
            Can I talk to a radiologist?
If you have any special requests before, during, or after the recheck process, you can talk to your assigned radiologists. Drop us an e-mail at <a className="style-none"  href="mailto:ask@mitrua.com"> <span>ask@mitrua.com</span> </a>  and we can arrange this for you
          
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>



{  !isOutside &&
    <div>
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px", letterSpacing:"-0px", color:"#000000"
            }} >Do you store my medical data?</Typography>
          </AccordionSummary>
      
        
          <AccordionDetails>
      
      
          <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>We never store the files you upload or your recheck reports without your consent. If you do not give us permission to keep your records, the images, and reports are kept on Amazon Web Services servers for 24 hours and then deleted permanently.</p>
          </div>
          
       
          </AccordionDetails>
        
        
        </Accordion>
      
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{  fontFamily : "ProductSans-Light", fontSize: "18px", letterSpacing:"-0px", color:"#000000"
            }} >Is Mitrua.com HIPAA compliant?</Typography>
          </AccordionSummary>
      
        
          <AccordionDetails>
      
      
          <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
             <p>The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for sensitive patient data protection. Companies that deal with protected health information (PHI) must have physical, network, and process security measures in place and follow them to ensure HIPAA Compliance.</p>
             <p>Here at Mitrua, everything you do on our website is HIPAA compliant and the systems/services we use are also HIPAA compliant. While processing your images for a second opinion report, we use HIPAA compliant Amazon Web Services servers. During the journey of your images recheck, the first step we take is to anonymize your images, so that neither our radiologists nor any other team member will know your name.</p>
          </div>
          
       
          </AccordionDetails>
        
        
        </Accordion>
    </div>

}


    </div>
  );
}

