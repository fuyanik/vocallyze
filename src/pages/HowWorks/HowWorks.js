import React from 'react'
import { Link } from 'react-router-dom'
import gV from '../../gV'
import Navbar from '../../homeComponents/1.Navbar/navbar'
import Footer from '../../homeComponents/11.Footer/footer'
import MobileFooter from '../../homeComponents/22.MobileFooter/mobileFooter'
import NavbarGen from '../../homeComponents/NavbarGen/NavbarGen'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Helmet } from 'react-helmet'
import FooterGen from '../../homeComponents/FooterGen/FooterGen'
import vocallyzeBg from '../../assets/images/vocallyze-bg.png'
import logo from '../../assets/images/logos.png'
import { useLocale } from '../../landing/LocaleProvider'

const COPY = {
  en: {
    metaTitle: "Vocallyze - How It Works",
    metaDescription: "Learn how Vocallyze audits your call center's recordings. Connect your calls, set your rulebook, and receive your first evidence-backed audit report.",
    metaOgDescription: "Understand the steps involved in auditing every call with Vocallyze. Connect your recordings, configure your rules, and get a detailed audit report.",
    metaTwitterDescription: "Follow these steps to get every call in your center audited by Vocallyze. Quick to connect, evidence-backed, fully covered.",
    title: "How It Works",
    intro: "Experience a simple, hassle-free setup designed for your call center. Get every recorded call audited against your own rulebook, ensuring you catch every violation with evidence you can trust.",
    steps: [
      {
        title: "Connect your call recordings",
        body: [
          "We will need access to your call recording archive, telephony system, or call center platform.",
          "You may connect a live integration, share a secure bulk export, or authorize Vocallyze to pull recordings directly from your existing setup.",
        ],
      },
      {
        title: "Choose your audit plan and configure your rulebook",
        body: [
          "Pricing is based on call volume, not seat licenses. We configure your institution's compliance rules before a single call is scored, with no hidden fees.",
        ],
      },
      {
        title: "Receive your first audit report",
        reportLine1: "You will get your first audit report",
        reportHighlight: "Within days",
        reportBody: "Your audit report will be more than a cold compliance score, it will contain the flagged transcript excerpt, the exact timestamp, and the original audio clip behind every finding.",
        cta: "Get Early Access",
      },
      {
        title: "Review flagged calls with our team",
        body: [
          "Vocallyze reports usually answer every question your compliance and quality team has. If anything is unclear, our team walks through the evidence with you call by call.",
        ],
      },
    ],
    whyTitle: "Why choose Vocallyze?",
    whyBody: "We're taking the guesswork out of call quality. With no sampling gaps, we surface every violation with a transcript, a timestamp, and the audio, all in one place, at one predictable price.",
    table: {
      includedPrefix: "What's included",
      includedSuffix: "in the cost?",
      manualControl: "Manual Control",
      otherServices: "Other Services",
      rows: [
        "Reviews call recordings",
        "Produces a quality score",
        "Online access to findings",
        "Audits 100% of call volume",
        "Quote, timestamp & audio per finding",
        "First findings within days",
        "Türkiye-based, on-premise infrastructure",
        "Autonomous assistant for repeat calls",
      ],
    },
  },
  tr: {
    metaTitle: "Vocallyze - Nasıl Çalışır",
    metaDescription: "Vocallyze'ın çağrı merkezinizin kayıtlarını nasıl denetlediğini öğrenin. Çağrılarınızı bağlayın, kural kitabınızı ayarlayın ve ilk kanıta dayalı denetim raporunuzu alın.",
    metaOgDescription: "Vocallyze ile her çağrıyı denetleme sürecindeki adımları öğrenin. Kayıtlarınızı bağlayın, kurallarınızı yapılandırın ve detaylı bir denetim raporu alın.",
    metaTwitterDescription: "Merkezinizdeki her çağrının Vocallyze tarafından denetlenmesi için bu adımları izleyin. Hızlı bağlantı, kanıta dayalı, tam kapsama.",
    title: "Nasıl Çalışır",
    intro: "Çağrı merkeziniz için tasarlanmış basit, sorunsuz bir kurulum yaşayın. Kaydedilen her çağrının kendi kural kitabınıza göre denetlenmesini sağlayın ve güvenebileceğiniz kanıtlarla her ihlali yakalayın.",
    steps: [
      {
        title: "Çağrı kayıtlarınızı bağlayın",
        body: [
          "Çağrı kayıt arşivinize, telefon sisteminize veya çağrı merkezi platformunuza erişime ihtiyacımız olacak.",
          "Canlı bir entegrasyon bağlayabilir, güvenli bir toplu dışa aktarım paylaşabilir veya Vocallyze'a mevcut kurulumunuzdan doğrudan kayıt çekme yetkisi verebilirsiniz.",
        ],
      },
      {
        title: "Denetim planınızı seçin ve kural kitabınızı yapılandırın",
        body: [
          "Fiyatlandırma koltuk lisansına değil çağrı hacmine dayanır. Tek bir çağrı bile puanlanmadan önce kurumunuzun uyumluluk kurallarını gizli ücret olmadan yapılandırırız.",
        ],
      },
      {
        title: "İlk denetim raporunuzu alın",
        reportLine1: "İlk denetim raporunuzu alacaksınız",
        reportHighlight: "Günler içinde",
        reportBody: "Denetim raporunuz soğuk bir uyumluluk puanından çok daha fazlası olacak; her bulgunun arkasındaki işaretli transkript alıntısını, tam zaman damgasını ve orijinal ses klibini içerecek.",
        cta: "Erken Erişim",
      },
      {
        title: "İşaretlenen çağrıları ekibimizle inceleyin",
        body: [
          "Vocallyze raporları genellikle uyumluluk ve kalite ekibinizin tüm sorularını yanıtlar. Herhangi bir şey belirsizse ekibimiz kanıtları sizinle çağrı çağrı inceler.",
        ],
      },
    ],
    whyTitle: "Neden Vocallyze?",
    whyBody: "Çağrı kalitesindeki belirsizliği ortadan kaldırıyoruz. Örnekleme boşluğu olmadan her ihlali bir transkript, bir zaman damgası ve ses kaydıyla tek bir yerde, öngörülebilir tek bir fiyata sunuyoruz.",
    table: {
      includedPrefix: "Fiyata neler",
      includedSuffix: "dahil?",
      manualControl: "Manuel Kontrol",
      otherServices: "Diğer Hizmetler",
      rows: [
        "Çağrı kayıtlarını inceler",
        "Bir kalite puanı üretir",
        "Bulgulara çevrimiçi erişim",
        "Çağrı hacminin %100'ünü denetler",
        "Her bulgu için alıntı, zaman damgası ve ses",
        "Günler içinde ilk bulgular",
        "Türkiye merkezli, kurum içi altyapı",
        "Tekrarlayan çağrılar için otonom asistan",
      ],
    },
  },
};

const HowWorks = ({isOutside = false}) => {

  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en;

  {!isOutside &&  window.scrollTo(0, 0);}
  AOS.init();
  
  return (
    <>
  {!isOutside &&   <NavbarGen  /> }
    { !isOutside &&  <Helmet>
        <html lang={locale} />
        <title>{t.metaTitle}</title>
        <meta
          name="description"
          content={t.metaDescription}
        />
        <meta
          name="keywords"
          content="how it works, call audit, call center compliance, Vocallyze process, conversation intelligence"
        />
        <meta property="og:title" content={t.metaTitle} />
        <meta
          property="og:description"
          content={t.metaOgDescription}
        />
        <meta property="og:image" content="%PUBLIC_URL%/path/to/your-image.png" />
        <meta property="og:url" content="https://vocallyze.com/how-works" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.metaTitle} />
        <meta
          name="twitter:description"
          content={t.metaTwitterDescription}
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/path/to/your-image.png" />
      </Helmet>
     }
     
      <div
        className={`w-screen ${
          isOutside ? "pt-0 " : "pt-[0.0vh] "
        } flex justify-center  font-product`}
      >
      
         
       

        <div className="w-screen items-center justify-center flex flex-col gap-5 pb-12">
          {/* How works */}
        
          <div class={` relative py-8 mb-8  md:mb-12 w-screen ${isOutside ? "lg:py-14" : "lg:py-28"}   flex flex-col items-center justify-center `}>
            <img
              className=" absolute w-[98%] rounded-sm h-full object-cover -z-10 "
              src={vocallyzeBg}
              alt=""
            />

            <h1 data-aos-duration="400" data-aos="fade-up"  class="text-[42px] font-bold mb-2 lg:mb-4 text-black">
              {t.title}
            </h1>
            <p data-aos-duration="400" data-aos="fade-up"  class="opacity-75 text-sm lg:text-base text-black w-[90vw] lg:w-[70vw] text-center ">
            {t.intro}
            </p>
          </div>

          {/* Stepper */}
          <div className="flex lg:w-[60vw] w-[96vw]   justify-center">
            <div class=" flex flex-col justify-center items-center ">
              <div class="how-it-works">
           
                <div  data-aos-duration="600" data-aos="fade-up"  class=" relative pb-10 how-it-works__item ml-14 md:ml-20">
                  <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200 how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
                    <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">
                      01
                    </span>
                  </div>

                  <div class="pt-1">
                    <div class="w-10 h-10 stroke-1.5 text-prim">
                      <svg
                        class="stroke-current-new"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
                        <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
                        <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
                        <line x1="11" y1="6" x2="20" y2="6"></line>
                        <line x1="11" y1="12" x2="20" y2="12"></line>
                        <line x1="11" y1="18" x2="20" y2="18"></line>
                      </svg>
                    </div>

                    <h2 class="mt-4 mb-2 text-[20px] font-bold">
                      {" "}
                      {t.steps[0].title}
                    </h2>
                    <div class="space-y-4 text-sm text-neutral-700 md:text-base">
                      <p>
                        {t.steps[0].body[0]}
                      </p>
                      <p>
                        {t.steps[0].body[1]}
                      </p>
                    </div>
                  </div>
                </div>

                <div  data-aos-duration="600" data-aos="fade-up"  class="relative pb-10 how-it-works__item ml-14 md:ml-20">
                  <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
                    <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">
                      02
                    </span>
                  </div>
                  <div class="pt-1">
                    <img
                      width="40"
                      height="40"
                      src="https://img.icons8.com/ios/50/93CEF9/medical-insurance--v1.png"
                      alt="audit-plan-setup"
                    />

                    <h2 class="mt-4 mb-2 text-[20px] font-bold">
                      {t.steps[1].title}
                    </h2>
                    <div class="space-y-4 text-sm text-neutral-700 md:text-base">
                      <p>
                        {t.steps[1].body[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div data-aos-duration="600" data-aos="fade-up"  class="relative pb-10 how-it-works__item ml-14 md:ml-20">
                  <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
                    <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">
                      03
                    </span>
                  </div>
                  <div class="pt-1">
                    <div class="w-10 h-10 stroke-1.5 text-prim">
                      <svg
                        class="stroke-current-new"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="9"></circle>
                        <polyline points="12 7 12 12 15 15"></polyline>
                      </svg>
                    </div>

                    <h2 class="mt-4 mb-2 text-[20px] font-bold">
                      {t.steps[2].title}
                    </h2>
                    <div class="space-y-4 text-sm text-neutral-700 md:text-base">
                      <p class="pb-4"></p>

                      <div class="mb-8 border-t border-neutral-200 rounded shadow">
                        <div class="p-4 space-y-4 rounded shadow-xs lg:p-6">
                          <div class="">
                            <p class="mb-1 text-sm font-medium lg:text-base">
                              {t.steps[2].reportLine1}{" "}
                            </p>
                            <p class="mb-4 text-xl font-semibold">{t.steps[2].reportHighlight}</p>
                            <p class="mb-3 text-sm lg:text-base text-neutral-700">
                              {t.steps[2].reportBody}{" "}
                            </p>
                            <Link to={"/form-new"}>
                              <div class=" px-5 py-3 bg-second hover:bg-prim duration-500 rounded-full   w-fit text-white tracking-wider text-sm cursor-pointer">
                                {t.steps[2].cta}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div data-aos-duration="600" data-aos="fade-up"  class="relative pb-10 how-it-works__item ml-14 md:ml-20">
                  <div class="absolute top-0 left-0 text-center inline-flex bg-neutral-200  how-it-works__itemConnector w-0.5 h-full -ml-10 md:-ml-16 justify-center items-start">
                    <span class="inline-flex items-center justify-center p-2 font-medium border-8 border-white rounded-full text-xs w-11 h-11 text-neutral-700 bg-neutral-200 how-it-works__counter">
                      04
                    </span>
                  </div>
                  <div class="pt-1">
                    <div class="w-10 h-10 stroke-1.5 text-prim">
                      <svg
                        class="stroke-current-new stroke-4"
                        viewBox="0 0 52 52"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M8.67 15.17V13A4.33 4.33 0 0113 8.67h4.33M8.67 36.83V39A4.33 4.33 0 0013 43.33h4.33M34.67 8.67H39A4.33 4.33 0 0143.33 13v2.17M34.67 43.33H39A4.33 4.33 0 0043.33 39v-2.17M26 24.83a4.67 4.67 0 100-9.33 4.67 4.67 0 000 9.33zM19 36.5v-2.33a4.67 4.67 0 014.67-4.67h4.66A4.67 4.67 0 0133 34.17v2.33"></path>
                      </svg>
                    </div>

                    <h2 class="mt-4 mb-2 text-[20px] font-bold">
                      {t.steps[3].title}
                    </h2>
                    <div class="space-y-4 text-sm text-neutral-700 md:text-base">
                      <p>
                        {t.steps[3].body[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why choose scan */}
          <div className={`w-[93vw] lg:w-[60vw] ${isOutside && ""} `}>
            <div class="  flex-col items-center self-center justify-center lg:mt-12  mt-5">
              <div class="space-y-1 md:text-center max-w-2xl mx-auto mb-12">
                <h2 data-aos-duration="600" data-aos="fade-up"  class="text-[32px] font-bold">{t.whyTitle}</h2>
                <p data-aos-duration="600" data-aos="fade-up" class="text-base lg:text-lg text-neutral-600 ">
                  {t.whyBody}
                </p>
              </div>

              <div class="rounded-2xl border border-grey-300 shadow-sm justify-center flex overflow-x-auto">
                <table class="  w-full border-collapse">
                  <thead>
                    <tr>
                      <td class="border-b rounded-tl-2xl bg-neutral-50 pl-3 pr-1 md:px-6 md:py-6 py-3 font-semibold leading-snug text-xs sm:text-sm lg:text-base">
                        {t.table.includedPrefix}{" "}
                        <span class="hidden sm:inline">{t.table.includedSuffix}</span>
                      </td>
                      <td class="border-b bg-neutral-50 px-1 md:px-6 md:py-6 py-3 font-semibold text-center text-xs md:text-base lg:text-lg">
                        <img
                          alt="Vocallyze Logo"
                          class="shrink-0 h-5 md:h-7 w-auto mx-auto object-contain"
                          src={logo}
                        />
                      </td>
                      <td class="border-b bg-neutral-50 px-1 md:px-6 md:py-6 py-3 font-semibold whitespace-normal md:whitespace-nowrap text-center leading-tight text-[10px] sm:text-sm md:text-base lg:text-lg">
                        {t.table.manualControl}
                      </td>
                      <td class="border-b bg-neutral-50 pl-1 pr-2 md:px-6 md:py-6 py-3 font-semibold whitespace-normal md:whitespace-nowrap text-center leading-tight text-[10px] sm:text-sm md:text-base lg:text-lg rounded-tr-2xl">
                        {t.table.otherServices}{" "}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[0]}
                      </td>

                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>

                      <td  class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[1]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[2]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[3]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                    </tr >
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[4]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[5]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                    <tr  data-aos-duration="400" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[6]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                    <tr  data-aos-duration="600" data-aos="fade-up">
                      <td class="border-y pl-3 pr-1 py-4 md:px-6 font-medium leading-snug text-xs md:text-sm lg:text-base">
                        {t.table.rows[7]}
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-7 lg:w-8 mx-auto stroke-2 text-prim">
                          <svg
                            class="stroke-current-new"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                      <td class="border-y px-2 md:px-6 py-4 md:py-6">
                        <div class="shrink-0 w-6 mx-auto stroke-2 text-neutral-400">
                          <svg
                            class="stroke-current-new-red"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M22.5 7.5L7.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M7.5 7.5L22.5 22.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isOutside &&  <FooterGen/> }
    </>
  );
}

export default HowWorks