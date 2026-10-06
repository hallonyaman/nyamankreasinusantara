const copy = {
  id: {
    nav_home:"BERANDA", nav_about:"TENTANG", nav_solutions:"SOLUSI", nav_projects:"PROYEK", nav_contact:"KONTAK",
    cta_nav:"MINTA PENAWARAN", hero_1:"BUTUH APA?", hero_2:"NYAMAN AJA.",
    hero_desc:"Solusi bisnis terintegrasi untuk procurement, creative, event, digital, facility services dan operational support — dikelola melalui satu partner yang dapat diandalkan.",
    cta_solutions:"MINTA PENAWARAN", cta_projects:"WHATSAPP",
    about_h1:"FOKUS PADA BISNIS ANDA.", about_h2:"KAMI HADIRKAN SOLUSINYA.",
    about_desc:"NYAMAN menyederhanakan kebutuhan bisnis dengan menggabungkan sourcing, koordinasi, eksekusi dan delivery dalam satu partnership yang terintegrasi.",
    solutions_kicker:"APA YANG KAMI KERJAKAN", projects_title:"PEKERJAAN YANG BERBICARA.",
    rfq_kicker:"REQUEST FOR QUOTATION", rfq_h1:"CERITAKAN KEBUTUHAN ANDA.", rfq_h2:"KAMI BANTU CARI SOLUSINYA.",
    rfq_desc:"Sampaikan brief singkat mengenai kebutuhan perusahaan Anda. Tim NYAMAN akan meninjau kebutuhan tersebut dan menghubungi Anda untuk pembahasan lebih lanjut.",
    rfq_wa:"Atau hubungi Tim NYAMAN via WhatsApp →", form_name:"Nama *", form_company:"Perusahaan *", form_category:"Kategori Kebutuhan *", form_select:"Pilih kategori", form_location:"Lokasi Project", form_timeline:"Target Waktu", form_brief:"Brief Kebutuhan *", form_submit:"KIRIM PERMINTAAN PENAWARAN", form_note:"Data Anda hanya digunakan untuk menindaklanjuti kebutuhan yang dikirimkan melalui form ini.",
    contact_h1:"PUNYA KEBUTUHAN BISNIS?", contact_whatsapp:"Hubungi Tim NYAMAN →", location_label:"Lokasi"
  },
  en: {
    nav_home:"HOME", nav_about:"ABOUT", nav_solutions:"SOLUTIONS", nav_projects:"PROJECTS", nav_contact:"CONTACT",
    cta_nav:"REQUEST A QUOTE", hero_1:"BUTUH APA?", hero_2:"NYAMAN AJA.",
    hero_desc:"Integrated business solutions for procurement, creative services, events, digital solutions, facility services and operational support — managed through one reliable partner.",
    cta_solutions:"REQUEST A QUOTE", cta_projects:"WHATSAPP",
    about_h1:"FOCUS ON YOUR BUSINESS.", about_h2:"WE BRING THE SOLUTIONS.",
    about_desc:"NYAMAN simplifies business requirements by bringing sourcing, coordination, execution and delivery into one integrated partnership.",
    solutions_kicker:"WHAT WE DO", projects_title:"WORK THAT SPEAKS FOR ITSELF.",
    rfq_kicker:"REQUEST FOR QUOTATION", rfq_h1:"TELL US WHAT YOU NEED.", rfq_h2:"WE'LL HELP FIND THE RIGHT SOLUTION.",
    rfq_desc:"Share a short brief about your company requirement. The NYAMAN team will review it and contact you for further discussion.",
    rfq_wa:"Or contact the NYAMAN Team via WhatsApp →", form_name:"Name *", form_company:"Company *", form_category:"Requirement Category *", form_select:"Select a category", form_location:"Project Location", form_timeline:"Target Timeline", form_brief:"Requirement Brief *", form_submit:"SEND REQUEST FOR QUOTATION", form_note:"Your data is used only to follow up on the requirement submitted through this form.",
    contact_h1:"HAVE A BUSINESS NEED?", contact_whatsapp:"Contact the NYAMAN Team →", location_label:"Location"
  }
};

const solutions = [
  ["GENERAL PROCUREMENT & TRADING","Sourcing dan pengadaan produk, peralatan dan kebutuhan korporat.","Sourcing and supply of products, equipment and corporate requirements."],
  ["CREATIVE, BRANDING & ADVERTISING","Brand activation, materi promosi dan produksi kreatif.","Brand activation, promotional materials and creative production."],
  ["EVENT, MICE & HOSPITALITY","Event planning, activation, meeting dan hospitality support.","Event planning, activation, corporate meetings and hospitality support."],
  ["DIGITAL & TECHNOLOGY SOLUTIONS","Pengembangan digital dan solusi teknologi berorientasi bisnis.","Digital development and business-oriented technology solutions."],
  ["FACILITY, MANPOWER & OPERATIONAL SUPPORT","Dukungan facility, manpower dan aktivitas operasional.","Facility, manpower and operational business support."],
  ["PROJECT & TECHNICAL SUPPORT","Rental, instalasi, transportasi dan dukungan teknis proyek.","Rental, installation, transportation and technical project support."]
];

let lang = localStorage.getItem("nyaman-lang") || "id";

function renderLanguage(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-id]").forEach(el => {
    const key = el.dataset.id;
    if(copy[lang][key]) el.textContent = copy[lang][key];
  });
  document.getElementById("location-text").textContent = lang === "id" ? "Surabaya, Jawa Timur, Indonesia" : "Surabaya, East Java, Indonesia";

  const idBtn = document.getElementById("lang-id");
  const enBtn = document.getElementById("lang-en");
  idBtn.className = "px-3 py-1.5 rounded-full " + (lang==="id" ? "bg-white text-nyaman-dark" : "text-white");
  enBtn.className = "px-3 py-1.5 rounded-full " + (lang==="en" ? "bg-white text-nyaman-dark" : "text-white");

  document.getElementById("solutions-grid").innerHTML = solutions.map((s,i)=>`
    <article class="bg-white p-8 border border-black/5">
      <span class="text-nyaman-gold text-xs font-bold">${String(i+1).padStart(2,"0")}</span>
      <h3 class="text-nyaman-navy font-bold text-lg mt-3 mb-4">${s[0]}</h3>
      <p class="text-nyaman-muted text-sm leading-6">${lang==="id"?s[1]:s[2]}</p>
    </article>`).join("");

  renderProjects();
}

async function renderProjects(){
  try{
    const res = await fetch("/content/site.json?ts="+Date.now());
    const data = await res.json();
    document.getElementById("projects-grid").innerHTML = data.projects.map(p => `
      <article class="project-card group overflow-hidden bg-nyaman-ivory">
        <div class="h-72 overflow-hidden"><img src="${p.cover}" alt="${lang==="id"?p.title_id:p.title_en}" class="w-full h-full object-cover"></div>
        <div class="p-7">
          <p class="text-nyaman-gold text-[10px] font-bold tracking-[.12em] uppercase">${p.category}</p>
          <h3 class="text-nyaman-navy text-xl font-bold mt-2">${lang==="id"?p.title_id:p.title_en}</h3>
          <p class="text-nyaman-muted text-xs mt-2">${p.location}</p>
          ${p.show_client ? `<p class="text-nyaman-muted text-xs mt-1">Client: ${p.client}</p>` : ""}
          <p class="text-nyaman-muted text-sm leading-6 mt-4">${lang==="id"?p.description_id:p.description_en}</p>
        </div>
      </article>`).join("");
  }catch(e){
    console.error(e);
  }
}

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

async function initSiteSettings() {
  try {
    const res = await fetch("/content/site.json?settings=" + Date.now());
    const data = await res.json();
    const company = data.company || {};
    const analytics = data.analytics || {};

    const ig = document.getElementById("instagram-link");
    if (ig) {
      if (company.instagram_url) ig.href = company.instagram_url;
      if (company.instagram_handle) ig.textContent = company.instagram_handle;
    }

    const li = document.getElementById("linkedin-display");
    if (li) {
      if (company.linkedin_url) {
        const a = document.createElement("a");
        a.href = company.linkedin_url;
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "font-semibold social-link transition";
        a.dataset.track = "linkedin";
        a.textContent = company.linkedin_handle || "LinkedIn";
        li.replaceWith(a);
      } else if (company.linkedin_handle) {
        li.textContent = company.linkedin_handle;
      }
    }

    const measurementId = (analytics.ga4_measurement_id || "").trim();
    if (measurementId && /^G-[A-Z0-9]+$/i.test(measurementId)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){dataLayer.push(arguments);};
      gtag("js", new Date());
      gtag("config", measurementId);
    }
  } catch (e) {
    console.error("Unable to load site settings", e);
  }
}

function bindTracking() {
  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-track]");
    if (!el) return;
    const type = el.dataset.track;
    const mapping = {
      whatsapp: "click_whatsapp",
      request_quote: "click_request_quote",
      instagram: "click_instagram",
      linkedin: "click_linkedin"
    };
    if (mapping[type]) trackEvent(mapping[type], {page_location: location.href});
  });

  const form = document.getElementById("rfq-form");
  if (form) {
    form.addEventListener("submit", () => trackEvent("submit_rfq", {form_name:"request-quotation"}));
  }
}

document.getElementById("lang-id").onclick=()=>{lang="id";localStorage.setItem("nyaman-lang",lang);trackEvent("language_change",{language:"id"});renderLanguage()};
document.getElementById("lang-en").onclick=()=>{lang="en";localStorage.setItem("nyaman-lang",lang);trackEvent("language_change",{language:"en"});renderLanguage()};

renderLanguage();
initSiteSettings().then(bindTracking);
