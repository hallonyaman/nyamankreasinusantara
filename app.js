const copy = {
  id: {
    nav_home: "BERANDA",
    nav_about: "TENTANG",
    nav_solutions: "SOLUSI",
    nav_projects: "PROYEK",
    nav_contact: "KONTAK",

    cta_nav: "MINTA PENAWARAN",
    hero_1: "BUTUH APA?",
    hero_2: "NYAMAN AJA.",

    hero_desc:
      "Solusi bisnis terintegrasi untuk procurement, creative, event, digital, facility services dan operational support — dikelola melalui satu partner yang dapat diandalkan.",

    cta_solutions: "MINTA PENAWARAN",
    cta_projects: "WHATSAPP",

    about_h1: "FOKUS PADA BISNIS ANDA.",
    about_h2: "KAMI HADIRKAN SOLUSINYA.",

    about_desc:
      "NYAMAN menyederhanakan kebutuhan bisnis dengan menggabungkan sourcing, koordinasi, eksekusi dan delivery dalam satu partnership yang terintegrasi.",

    solutions_kicker: "APA YANG KAMI KERJAKAN",
    projects_title: "PEKERJAAN YANG BERBICARA.",

    rfq_kicker: "REQUEST FOR QUOTATION",
    rfq_h1: "CERITAKAN KEBUTUHAN ANDA.",
    rfq_h2: "KAMI BANTU CARI SOLUSINYA.",

    rfq_desc:
      "Sampaikan brief singkat mengenai kebutuhan perusahaan Anda. Team NYAMAN akan meninjau kebutuhan tersebut dan menghubungi Anda untuk pembahasan lebih lanjut.",

    rfq_wa: "Atau hubungi Team NYAMAN via WhatsApp →",

    form_name: "Nama *",
    form_company: "Perusahaan *",
    form_category: "Kategori Kebutuhan *",
    form_select: "Pilih kategori",
    form_location: "Lokasi Project",
    form_timeline: "Target Waktu",
    form_brief: "Brief Kebutuhan *",
    form_submit: "KIRIM PERMINTAAN PENAWARAN",

    form_note:
      "Data Anda hanya digunakan untuk menindaklanjuti kebutuhan yang dikirimkan melalui form ini.",

    contact_h1: "PUNYA KEBUTUHAN BISNIS?",
    contact_whatsapp: "Hubungi Team NYAMAN →",
    location_label: "Lokasi"
  },

  en: {
    nav_home: "HOME",
    nav_about: "ABOUT",
    nav_solutions: "SOLUTIONS",
    nav_projects: "PROJECTS",
    nav_contact: "CONTACT",

    cta_nav: "REQUEST A QUOTE",
    hero_1: "BUTUH APA?",
    hero_2: "NYAMAN AJA.",

    hero_desc:
      "Integrated business solutions for procurement, creative services, events, digital solutions, facility services and operational support — managed through one reliable partner.",

    cta_solutions: "REQUEST A QUOTE",
    cta_projects: "WHATSAPP",

    about_h1: "FOCUS ON YOUR BUSINESS.",
    about_h2: "WE BRING THE SOLUTIONS.",

    about_desc:
      "NYAMAN simplifies business requirements by bringing sourcing, coordination, execution and delivery into one integrated partnership.",

    solutions_kicker: "WHAT WE DO",
    projects_title: "WORK THAT SPEAKS FOR ITSELF.",

    rfq_kicker: "REQUEST FOR QUOTATION",
    rfq_h1: "TELL US WHAT YOU NEED.",
    rfq_h2: "WE'LL HELP FIND THE RIGHT SOLUTION.",

    rfq_desc:
      "Share a short brief about your company requirement. The NYAMAN team will review it and contact you for further discussion.",

    rfq_wa: "Or contact the NYAMAN Team via WhatsApp →",

    form_name: "Name *",
    form_company: "Company *",
    form_category: "Requirement Category *",
    form_select: "Select a category",
    form_location: "Project Location",
    form_timeline: "Target Timeline",
    form_brief: "Requirement Brief *",
    form_submit: "SEND REQUEST FOR QUOTATION",

    form_note:
      "Your data is used only to follow up on the requirement submitted through this form.",

    contact_h1: "HAVE A BUSINESS NEED?",
    contact_whatsapp: "Contact the NYAMAN Team →",
    location_label: "Location"
  }
};


const solutions = [
  [
    "GENERAL PROCUREMENT & TRADING",
    "Sourcing dan pengadaan produk, peralatan dan kebutuhan korporat.",
    "Sourcing and supply of products, equipment and corporate requirements."
  ],

  [
    "CREATIVE, BRANDING & ADVERTISING",
    "Brand activation, materi promosi dan produksi kreatif.",
    "Brand activation, promotional materials and creative production."
  ],

  [
    "EVENT, MICE & HOSPITALITY",
    "Event planning, activation, meeting dan hospitality support.",
    "Event planning, activation, corporate meetings and hospitality support."
  ],

  [
    "DIGITAL & TECHNOLOGY SOLUTIONS",
    "Pengembangan digital dan solusi teknologi berorientasi bisnis.",
    "Digital development and business-oriented technology solutions."
  ],

  [
    "FACILITY, MANPOWER & OPERATIONAL SUPPORT",
    "Dukungan facility, manpower dan aktivitas operasional.",
    "Facility, manpower and operational business support."
  ],

  [
    "PROJECT & TECHNICAL SUPPORT",
    "Rental, instalasi, transportasi dan dukungan teknis proyek.",
    "Rental, installation, transportation and technical project support."
  ]
];


let lang = localStorage.getItem("nyaman-lang") || "id";

let siteData = {};
let companyData = {};

const trackedProjects = new Set();
const trackedSolutions = new Set();


/* =========================================
   SECURITY / TEXT HELPERS
========================================= */

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function escapeAttribute(value = "") {
  return escapeHtml(value);
}


/* =========================================
   GOOGLE ANALYTICS EVENT TRACKING
========================================= */

function trackEvent(eventName, params = {}) {

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    ...params,
    page_location: window.location.href,
    page_title: document.title
  });
}


/* =========================================
   LANGUAGE
========================================= */

function renderLanguage() {

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-id]").forEach(el => {

    const key = el.dataset.id;

    if (
      copy[lang] &&
      Object.prototype.hasOwnProperty.call(copy[lang], key)
    ) {
      el.textContent = copy[lang][key];
    }

  });


  const locationText = document.getElementById("location-text");

  if (locationText) {

    if (lang === "id") {

      locationText.textContent =
        companyData.location_id ||
        "Surabaya, Jawa Timur, Indonesia";

    } else {

      locationText.textContent =
        companyData.location_en ||
        "Surabaya, East Java, Indonesia";

    }

  }


  const idBtn = document.getElementById("lang-id");
  const enBtn = document.getElementById("lang-en");


  if (idBtn) {

    idBtn.className =
      "px-3 py-1.5 rounded-full " +
      (
        lang === "id"
          ? "bg-white text-nyaman-dark"
          : "text-white"
      );

  }


  if (enBtn) {

    enBtn.className =
      "px-3 py-1.5 rounded-full " +
      (
        lang === "en"
          ? "bg-white text-nyaman-dark"
          : "text-white"
      );

  }


  renderSolutions();
  renderProjects();
}


/* =========================================
   SOLUTIONS
========================================= */

function renderSolutions() {

  const grid = document.getElementById("solutions-grid");

  if (!grid) return;


  grid.innerHTML = solutions.map((solution, index) => {

    const title = solution[0];
    const description =
      lang === "id"
        ? solution[1]
        : solution[2];


    return `
      <article
        class="solution-card bg-white p-8 border border-black/5"
        data-solution-title="${escapeAttribute(title)}"
      >

        <span class="text-nyaman-gold text-xs font-bold">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <h3 class="text-nyaman-navy font-bold text-lg mt-3 mb-4">
          ${escapeHtml(title)}
        </h3>

        <p class="text-nyaman-muted text-sm leading-6">
          ${escapeHtml(description)}
        </p>

      </article>
    `;

  }).join("");


  observeSolutions();
}


/* =========================================
   PROJECTS
========================================= */

async function renderProjects() {

  const grid = document.getElementById("projects-grid");

  if (!grid) return;


  try {

    let data = siteData;


    if (!data.projects) {

      const response = await fetch(
        "/content/site.json?ts=" + Date.now(),
        {
          cache: "no-store"
        }
      );


      if (!response.ok) {
        throw new Error(
          "Unable to load project data"
        );
      }


      data = await response.json();

      siteData = data;

    }


    const projects =
      Array.isArray(data.projects)
        ? data.projects.filter(
            project =>
              project.featured !== false
          )
        : [];


    if (!projects.length) {

      grid.innerHTML = `
        <p class="text-nyaman-muted text-sm">
          Project portfolio sedang diperbarui.
        </p>
      `;

      return;

    }


    grid.innerHTML = projects.map(project => {

      const title =
        lang === "id"
          ? project.title_id
          : project.title_en;


      const description =
        lang === "id"
          ? project.description_id
          : project.description_en;


      return `

        <article
          class="project-card group overflow-hidden bg-nyaman-ivory"
          data-project-title="${escapeAttribute(project.title_id || title)}"
          data-project-category="${escapeAttribute(project.category || "")}"
        >

          <div class="h-72 overflow-hidden">

            <img
              src="${escapeAttribute(project.cover || "")}"
              alt="${escapeAttribute(title || "NYAMAN Project")}"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            >

          </div>


          <div class="p-7">

            <p class="text-nyaman-gold text-[10px] font-bold tracking-[.12em] uppercase">
              ${escapeHtml(project.category || "")}
            </p>


            <h3 class="text-nyaman-navy text-xl font-bold mt-2">
              ${escapeHtml(title || "")}
            </h3>


            <p class="text-nyaman-muted text-xs mt-2">
              ${escapeHtml(project.location || "")}
            </p>


            ${
              project.show_client && project.client

                ? `
                  <p class="text-nyaman-muted text-xs mt-1">
                    Client: ${escapeHtml(project.client)}
                  </p>
                `

                : ""
            }


            <p class="text-nyaman-muted text-sm leading-6 mt-4">
              ${escapeHtml(description || "")}
            </p>

          </div>

        </article>
      `;

    }).join("");


    observeProjects();


  } catch (error) {

    console.error(
      "Unable to load projects",
      error
    );


    grid.innerHTML = `
      <p class="text-nyaman-muted text-sm">
        Project portfolio belum dapat dimuat.
      </p>
    `;

  }

}


/* =========================================
   VIEW PROJECT TRACKING
========================================= */

function observeProjects() {

  if (!("IntersectionObserver" in window)) {
    return;
  }


  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        const element = entry.target;

        const title =
          element.dataset.projectTitle || "";

        const category =
          element.dataset.projectCategory || "";


        if (
          title &&
          !trackedProjects.has(title)
        ) {

          trackedProjects.add(title);


          trackEvent(
            "view_project",
            {
              project_name: title,
              project_category: category
            }
          );

        }


        observer.unobserve(element);

      });

    },

    {
      threshold: 0.5
    }

  );


  document
    .querySelectorAll(".project-card")
    .forEach(card => observer.observe(card));

}


/* =========================================
   VIEW SOLUTION TRACKING
========================================= */

function observeSolutions() {

  if (!("IntersectionObserver" in window)) {
    return;
  }


  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        const element = entry.target;

        const title =
          element.dataset.solutionTitle || "";


        if (
          title &&
          !trackedSolutions.has(title)
        ) {

          trackedSolutions.add(title);


          trackEvent(
            "view_solution",
            {
              solution_name: title
            }
          );

        }


        observer.unobserve(element);

      });

    },

    {
      threshold: 0.5
    }

  );


  document
    .querySelectorAll(".solution-card")
    .forEach(card => observer.observe(card));

}


/* =========================================
   WHATSAPP NUMBER
========================================= */

function normalizeWhatsAppNumber(number) {

  if (!number) return "";


  let normalized =
    String(number)
      .replace(/\D/g, "");


  if (normalized.startsWith("0")) {

    normalized =
      "62" +
      normalized.substring(1);

  }


  return normalized;
}


/* =========================================
   SITE SETTINGS
========================================= */

async function initSiteSettings() {

  try {

    const response = await fetch(
      "/content/site.json?settings=" +
      Date.now(),
      {
        cache: "no-store"
      }
    );


    if (!response.ok) {

      throw new Error(
        "Unable to load site settings"
      );

    }


    const data = await response.json();

    siteData = data;

    companyData =
      data.company || {};


    /* INSTAGRAM */

    const instagram =
      document.getElementById(
        "instagram-link"
      );


    if (instagram) {

      if (companyData.instagram_url) {

        instagram.href =
          companyData.instagram_url;

      }


      if (companyData.instagram_handle) {

        instagram.textContent =
          companyData.instagram_handle;

      }

    }


    /* LINKEDIN */

    const linkedin =
      document.getElementById(
        "linkedin-display"
      );


    if (linkedin) {

      if (companyData.linkedin_url) {

        const anchor =
          document.createElement("a");


        anchor.href =
          companyData.linkedin_url;


        anchor.target =
          "_blank";


        anchor.rel =
          "noopener";


        anchor.className =
          "font-semibold social-link transition";


        anchor.dataset.track =
          "linkedin";


        anchor.textContent =
          companyData.linkedin_handle ||
          "LinkedIn";


        linkedin.replaceWith(anchor);


      } else if (
        companyData.linkedin_handle
      ) {

        linkedin.textContent =
          companyData.linkedin_handle;

      }

    }


    /* EMAIL */

    if (companyData.email) {

      document
        .querySelectorAll(
          'a[href^="mailto:"]'
        )
        .forEach(link => {

          link.href =
            "mailto:" +
            companyData.email;


          link.textContent =
            companyData.email;

        });

    }


    /* WHATSAPP */

    const whatsappNumber =
      normalizeWhatsAppNumber(
        companyData.whatsapp_number
      );


    if (whatsappNumber) {

      document
        .querySelectorAll(
          'a[href*="wa.me/"]'
        )
        .forEach(link => {

          try {

            const oldUrl =
              new URL(link.href);


            const message =
              oldUrl.searchParams.get(
                "text"
              ) || "";


            const newUrl =
              "https://wa.me/" +
              whatsappNumber +
              (
                message
                  ? "?text=" +
                    encodeURIComponent(message)
                  : ""
              );


            link.href = newUrl;

          } catch (error) {

            console.warn(
              "Unable to update WhatsApp link",
              error
            );

          }

        });

    }


  } catch (error) {

    console.error(
      "Unable to load site settings",
      error
    );

  }

}


/* =========================================
   CLICK TRACKING
========================================= */

function bindTracking() {

  document.addEventListener(
    "click",
    event => {

      const element =
        event.target.closest(
          "[data-track]"
        );


      if (!element) {
        return;
      }


      const type =
        element.dataset.track;


      const locationName =
        element.dataset.id ||
        element.id ||
        "website";


      const mapping = {

        whatsapp:
          "click_whatsapp",

        request_quote:
          "click_request_quote",

        instagram:
          "click_instagram",

        linkedin:
          "click_linkedin"

      };


      if (mapping[type]) {

        trackEvent(
          mapping[type],
          {
            link_location:
              locationName
          }
        );

      }

    }
  );


  bindRFQTracking();

}


/* =========================================
   RFQ TRACKING
========================================= */

function bindRFQTracking() {

  const form =
    document.getElementById(
      "rfq-form"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      /*
        Jika Google Analytics belum aktif,
        form tetap dikirim normal.
      */

      if (
        typeof window.gtag !==
        "function"
      ) {

        return;

      }


      /*
        Tahan redirect sesaat agar event
        sempat terkirim ke GA4.
      */

      event.preventDefault();


      let submitted = false;


      const submitForm = () => {

        if (submitted) {
          return;
        }


        submitted = true;


        form.submit();

      };


      window.gtag(
        "event",
        "submit_rfq",
        {

          form_name:
            "request-quotation",

          event_callback:
            submitForm,

          event_timeout:
            1500

        }
      );


      /*
        Fallback supaya form tetap terkirim
        apabila GA callback tidak berjalan.
      */

      setTimeout(
        submitForm,
        1700
      );

    }
  );

}


/* =========================================
   LANGUAGE BUTTONS
========================================= */

function bindLanguageButtons() {

  const idButton =
    document.getElementById(
      "lang-id"
    );


  const enButton =
    document.getElementById(
      "lang-en"
    );


  if (idButton) {

    idButton.onclick = () => {

      lang = "id";


      localStorage.setItem(
        "nyaman-lang",
        lang
      );


      trackEvent(
        "language_change",
        {
          language: "id"
        }
      );


      renderLanguage();

    };

  }


  if (enButton) {

    enButton.onclick = () => {

      lang = "en";


      localStorage.setItem(
        "nyaman-lang",
        lang
      );


      trackEvent(
        "language_change",
        {
          language: "en"
        }
      );


      renderLanguage();

    };

  }

}


/* =========================================
   INITIALIZE WEBSITE
========================================= */

async function initWebsite() {

  await initSiteSettings();

  bindLanguageButtons();

  bindTracking();

  renderLanguage();

}


initWebsite();
