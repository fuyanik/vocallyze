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
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }} > I don't have my call recordings centralized in one place. What should I do?</Typography>
        </AccordionSummary>


        <AccordionDetails>
       
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>You don't need a clean, centralized archive to get started. We connect directly to your call recording system, telephony platform, or CRM export — whatever you already use today. </p>
            <p>During setup you can choose a live integration, a secure bulk export of historical calls, or authorize Vocallyze to pull recordings directly from your call center platform.</p>
         </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>


      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }} >When will I get my first audit report?</Typography>
        </AccordionSummary>


        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>Once your call recordings are connected and your institution's rulebook is configured, you'll receive your first audit report within days, not weeks. From then on every new call is scored continuously, so reports keep arriving as calls come in.
          </p>
        
        </div>
        
        
        </AccordionDetails>
    
    
    
      </Accordion>

      <Accordion 
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }}>What will my audit report include?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>It will include four sections.	</p>
          <p>
Call record & compliance score: an overview of the call, the agent, and the overall score.	
Rule-by-rule findings: which of your institution's rules passed or failed, and why.	
Evidence: the verbatim transcript excerpt, the exact timestamp, and the original audio clip behind every finding.	
Suggested action: what your team should do next, from a written correction to escalation.</p>

<p>Want to see sample reports?</p>
<Link to={"/sample-reports"}>
               <div class= " px-5 py-3 bg-second hover:bg-prim duration-500 rounded-full   w-fit text-white tracking-wider text-sm cursor-pointer">See Sample Report</div>
             </Link>


           
        </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }} >How much will I pay for call auditing?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
          <p>Pricing is based on call volume, not seat licenses. Full-call auditing costs 0.75-1.25 TL per call depending on volume, with no setup fee and no hidden charges. If you also use the autonomous voice assistant for repetitive calls, that's billed separately at 1-2 TL per minute, only for the minutes it actually handles.</p>
        
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }} >Can I export or share an audit report?</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>Yes. Every report can be exported as a PDF and shared with your compliance, legal, or operations team. Reports are time-stamped automatically, so you never need a separate paper trail.</p>
            <p><b>Can I talk to your team about a finding?</b><br/>If anything in a report is unclear, or you'd like a second look at a specific call, drop us an e-mail at <a className="style-none"  href="mailto:ask@vocallyze.com"> <span>ask@vocallyze.com</span> </a> and we'll walk through the evidence with you.</p>
          
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
          <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px", letterSpacing:"-0px", color:"#00688F"
            }} >Do you store our call data?</Typography>
          </AccordionSummary>
      
        
          <AccordionDetails>
      
      
          <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>Your call recordings and audit results are processed under a data processing agreement with your institution — your institution remains the data controller, Vocallyze acts strictly as the data processor. Recordings are hosted on Türkiye-based infrastructure, or fully on-premise for institutions with stricter requirements, and are retained only as long as your own retention policy requires.</p>
          </div>
          
       
          </AccordionDetails>
        
        
        </Accordion>
      
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px", letterSpacing:"-0px", color:"#00688F"
            }} >Is Vocallyze KVKK compliant?</Typography>
          </AccordionSummary>
      
        
          <AccordionDetails>
      
      
          <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
             <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) sets the standard for how personal data, including call recordings, must be processed in Türkiye. Institutions handling personal data must have a valid legal basis, technical safeguards, and processing agreements in place to stay compliant.</p>
             <p>Vocallyze processes every call under a KVKK-compliant data processing agreement. Personal identifiers are masked in the transcript before it ever reaches the language model, and no recording, transcript, or identifier leaves your institution's network without your explicit authorization.</p>
          </div>
          
       
          </AccordionDetails>
        
        
        </Accordion>
    </div>

}


    </div>
  );
}

