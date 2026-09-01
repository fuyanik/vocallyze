import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";



import { MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocale } from "../../../landing/LocaleProvider";




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

const COPY = {
  en: {
    panel2: {
      q: "I don't have my call recordings centralized in one place. What should I do?",
      p1: "You don't need a clean, centralized archive to get started. We connect directly to your call recording system, telephony platform, or CRM export — whatever you already use today.",
      p2: "During setup you can choose a live integration, a secure bulk export of historical calls, or authorize Vocallyze to pull recordings directly from your call center platform.",
    },
    panel3: {
      q: "When will I get my first audit report?",
      p1: "Once your call recordings are connected and your institution's rulebook is configured, you'll receive your first audit report within days, not weeks. From then on every new call is scored continuously, so reports keep arriving as calls come in.",
    },
    panel4: {
      q: "What will my audit report include?",
      intro: "It will include four sections.",
      body: "Call record & compliance score: an overview of the call, the agent, and the overall score.\nRule-by-rule findings: which of your institution's rules passed or failed, and why.\nEvidence: the verbatim transcript excerpt, the exact timestamp, and the original audio clip behind every finding.\nSuggested action: what your team should do next, from a written correction to escalation.",
      seeSamples: "Want to see sample reports?",
      cta: "See Sample Report",
    },
    panel5: {
      q: "How much will I pay for call auditing?",
      p1: "Pricing is based on call volume, not seat licenses. Full-call auditing costs 0.75-1.25 TL per call depending on volume, with no setup fee and no hidden charges. If you also use the autonomous voice assistant for repetitive calls, that's billed separately at 1-2 TL per minute, only for the minutes it actually handles.",
    },
    panel6: {
      q: "Can I export or share an audit report?",
      p1: "Yes. Every report can be exported as a PDF and shared with your compliance, legal, or operations team. Reports are time-stamped automatically, so you never need a separate paper trail.",
      p2title: "Can I talk to your team about a finding?",
      p2rest: "If anything in a report is unclear, or you'd like a second look at a specific call, drop us an e-mail at",
      p2end: "and we'll walk through the evidence with you.",
    },
    panel7: {
      q: "Do you store our call data?",
      p1: "Your call recordings and audit results are processed under a data processing agreement with your institution — your institution remains the data controller, Vocallyze acts strictly as the data processor. Recordings are hosted on Türkiye-based infrastructure, or fully on-premise for institutions with stricter requirements, and are retained only as long as your own retention policy requires.",
    },
    panel8: {
      q: "Is Vocallyze KVKK compliant?",
      p1: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) sets the standard for how personal data, including call recordings, must be processed in Türkiye. Institutions handling personal data must have a valid legal basis, technical safeguards, and processing agreements in place to stay compliant.",
      p2: "Vocallyze processes every call under a KVKK-compliant data processing agreement. Personal identifiers are masked in the transcript before it ever reaches the language model, and no recording, transcript, or identifier leaves your institution's network without your explicit authorization.",
    },
  },
  tr: {
    panel2: {
      q: "Çağrı kayıtlarım tek bir yerde toplanmış değil. Ne yapmalıyım?",
      p1: "Başlamak için düzenli, merkezi bir arşive ihtiyacınız yok. Bugün zaten kullandığınız çağrı kayıt sisteminize, telefon altyapınıza veya CRM dışa aktarımınıza doğrudan bağlanıyoruz.",
      p2: "Kurulum sırasında canlı bir entegrasyon, geçmiş çağrıların güvenli bir toplu dışa aktarımını veya Vocallyze'a çağrı merkezi platformunuzdan doğrudan kayıt çekme yetkisi vermeyi seçebilirsiniz.",
    },
    panel3: {
      q: "İlk denetim raporumu ne zaman alacağım?",
      p1: "Çağrı kayıtlarınız bağlanıp kurumunuzun kural kitabı yapılandırıldıktan sonra ilk denetim raporunuzu haftalar içinde değil, günler içinde alırsınız. O andan itibaren her yeni çağrı sürekli olarak puanlanır, böylece çağrılar geldikçe raporlar gelmeye devam eder.",
    },
    panel4: {
      q: "Denetim raporum neler içerecek?",
      intro: "Dört bölüm içerecek.",
      body: "Çağrı kaydı ve uyumluluk puanı: çağrının, temsilcinin ve genel puanın bir özeti.\nKural bazlı bulgular: kurumunuzun hangi kurallarının geçtiği veya başarısız olduğu ve nedeni.\nKanıt: birebir transkript alıntısı, tam zaman damgası ve her bulgunun arkasındaki orijinal ses klibi.\nÖnerilen aksiyon: yazılı bir düzeltmeden yükseltmeye kadar ekibinizin sırada ne yapması gerektiği.",
      seeSamples: "Örnek raporları görmek ister misiniz?",
      cta: "Örnek Raporu Gör",
    },
    panel5: {
      q: "Çağrı denetimi için ne kadar ödeyeceğim?",
      p1: "Fiyatlandırma koltuk lisansına değil çağrı hacmine dayanır. Tam çağrı denetimi hacme bağlı olarak çağrı başına 0,75-1,25 TL'ye mal olur; kurulum ücreti veya gizli masraf yoktur. Tekrarlayan çağrılar için otonom sesli asistanı da kullanırsanız, bu ayrıca yalnızca gerçekten işlediği dakikalar için dakika başına 1-2 TL olarak faturalandırılır.",
    },
    panel6: {
      q: "Bir denetim raporunu dışa aktarabilir veya paylaşabilir miyim?",
      p1: "Evet. Her rapor PDF olarak dışa aktarılabilir ve uyumluluk, hukuk veya operasyon ekibinizle paylaşılabilir. Raporlar otomatik olarak zaman damgalıdır, böylece ayrı bir kağıt izine hiç ihtiyacınız olmaz.",
      p2title: "Bir bulgu hakkında ekibinizle konuşabilir miyim?",
      p2rest: "Bir raporda anlaşılmayan bir şey varsa veya belirli bir çağrıya ikinci bir göz atılmasını isterseniz, bize",
      p2end: "adresinden e-posta gönderin, kanıtları sizinle birlikte inceleyelim.",
    },
    panel7: {
      q: "Çağrı verilerimizi saklıyor musunuz?",
      p1: "Çağrı kayıtlarınız ve denetim sonuçlarınız kurumunuzla yapılan bir veri işleme anlaşması kapsamında işlenir — kurumunuz veri sorumlusu olarak kalır, Vocallyze yalnızca veri işleyen olarak hareket eder. Kayıtlar Türkiye merkezli altyapıda veya daha katı gereksinimleri olan kurumlar için tamamen kurum içinde barındırılır ve yalnızca kendi saklama politikanızın gerektirdiği süre boyunca tutulur.",
    },
    panel8: {
      q: "Vocallyze KVKK uyumlu mu?",
      p1: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), çağrı kayıtları dahil kişisel verilerin Türkiye'de nasıl işlenmesi gerektiğine dair standardı belirler. Kişisel veri işleyen kurumların uyumlu kalabilmek için geçerli bir hukuki dayanağa, teknik güvenlik önlemlerine ve işleme anlaşmalarına sahip olması gerekir.",
      p2: "Vocallyze her çağrıyı KVKK uyumlu bir veri işleme anlaşması kapsamında işler. Kişisel tanımlayıcılar, transkript dil modeline ulaşmadan önce maskelenir ve hiçbir kayıt, transkript veya kimlik bilgisi açık izniniz olmadan kurumunuzun ağından çıkmaz.",
    },
  },
};

const YellowButton = ({text}) => {
    return(
        <div className="accordions-yellow-button">  
           {text}
        </div>
    )
 }

export default function AccordionRecheck({isOutside = false}) {
  const [expanded, setExpanded] = React.useState("panel1");
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en;

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
          }} >{t.panel2.q}</Typography>
        </AccordionSummary>


        <AccordionDetails>
       
        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>{t.panel2.p1}</p>
            <p>{t.panel2.p2}</p>
         </div>
        
        
        </AccordionDetails>
    
    
      </Accordion>


      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }} >{t.panel3.q}</Typography>
        </AccordionSummary>


        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>{t.panel3.p1}
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
          }}>{t.panel4.q}</Typography>
        </AccordionSummary>
      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
         
          <p>{t.panel4.intro}</p>
          <p style={{ whiteSpace: "pre-line" }}>{t.panel4.body}</p>

<p>{t.panel4.seeSamples}</p>
<Link to={"/sample-reports"}>
               <div class= " px-5 py-3 bg-second hover:bg-prim duration-500 rounded-full   w-fit text-white tracking-wider text-sm cursor-pointer">{t.panel4.cta}</div>
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
          }} >{t.panel5.q}</Typography>
        </AccordionSummary>

      
        <AccordionDetails>

        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
          <p>{t.panel5.p1}</p>
        
         </div>
        
     
        </AccordionDetails>
      
      
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px",  letterSpacing:"-0px", color:"#00688F"
          }} >{t.panel6.q}</Typography>
        </AccordionSummary>

      
        <AccordionDetails>


        <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>{t.panel6.p1}</p>
            <p><b>{t.panel6.p2title}</b><br/>{t.panel6.p2rest} <a className="style-none"  href="mailto:ask@vocallyze.com"> <span>ask@vocallyze.com</span> </a> {t.panel6.p2end}</p>
          
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
            }} >{t.panel7.q}</Typography>
          </AccordionSummary>
      
        
          <AccordionDetails>
      
      
          <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
            <p>{t.panel7.p1}</p>
          </div>
          
       
          </AccordionDetails>
        
        
        </Accordion>
      
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography data-aos-duration="600" data-aos="fade-up" style={{  fontFamily : "ProductSans-Light", fontSize: "18px", letterSpacing:"-0px", color:"#00688F"
            }} >{t.panel8.q}</Typography>
          </AccordionSummary>
      
        
          <AccordionDetails>
      
      
          <div className="accordions-text" style={{display: "flex", flexDirection: "column", gap:"16px" }}>
             <p>{t.panel8.p1}</p>
             <p>{t.panel8.p2}</p>
          </div>
          
       
          </AccordionDetails>
        
        
        </Accordion>
    </div>

}


    </div>
  );
}
