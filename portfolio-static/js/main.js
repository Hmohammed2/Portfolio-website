const projects = [
  {
    img: "assets/arcadesticklabs-logo.webp",
    title: "ArcadeStickLabs",
    description:
      "A fully custom-built ordering system designed for fast repeat purchasing complex product variants and scalable catalogue growth — built to replace manual order handling and support future B2B trade expansion.",
    link: "/case-studies/arcadesticklabs.html",
    external: false,
  },
  {
    img: "assets/ResumeLogo.webp",
    title: "AIElevateCV",
    description:
      "A web tool that optimizes and tailors resumes based on job descriptions.",
    link: "https://aielevatecv.com",
    external: true,
  },
  {
    img: "assets/Talibah.png",
    title: "Talibah Match",
    description:
      "A matrimonial platform for matching Muslims seeking knowledge.",
    link: "/case-studies/talibah.html",
    external: false,
  },
  {
    img: "assets/Geocode.PNG",
    title: "SimpleGeoAPI",
    description:
      "An API for seamless geographic data integration and POI analysis.",
    link: "https://simplegeoapi.com",
    external: true,
  },
  {
    img: "assets/tutor-search.png",
    title: "Harambee Tutors",
    description:
      "An online tutoring service project for students and tutors alike.",
    link: "https://harambeedevops.com",
    external: true,
  },
  {
    img: "assets/tcpcomm.gif",
    title: "Lightweight TCP Server with HTTP Handling",
    description:
      "A lightweight TCP server built using Node.js with custom HTTP handling.",
    link: "https://github.com/Hmohammed2/HTTP_Server",
    external: true,
  },
  {
    img: "assets/project-overview.png",
    title: "Pinterest Data Pipeline",
    description: "End-to-end Pinterest Lambda pipeline replication project.",
    link: "https://github.com/Hmohammed2/Pinterest_Data_pipeline",
    external: true,
  },
];

const track = document.getElementById("projects-track");
const container = document.getElementById("projects-container");
const prevProjectBtn = document.getElementById("prev-project");
const nextProjectBtn = document.getElementById("next-project");

const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const formStatus = document.getElementById("form-status");

let currentIndex = 0;
let projectsPerPage = 3;
const GAP = 24;

function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
    });
  }
}

function initLucide() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    const isHidden = navMenu.classList.contains("hidden");
    navMenu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", String(isHidden));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function getCardWidth() {
  if (!container) return 0;
  const containerWidth = container.offsetWidth;
  return (containerWidth - (projectsPerPage - 1) * GAP) / projectsPerPage;
}

function renderProjects() {
  if (!track) return;

  track.innerHTML = projects
    .map(
      (project) => `
        <article
          class="glass-card rounded-2xl overflow-hidden border border-white/5 flex-shrink-0"
          style="width: ${getCardWidth()}px"
        >
          <div class="aspect-[16/10] overflow-hidden bg-gray-800">
            <img
              src="${project.img}"
              alt="${project.title}"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
            <p class="text-gray-400 mb-4">${project.description}</p>

            <a
              href="${project.link}"
              ${
                project.external
                  ? 'target="_blank" rel="noopener noreferrer"'
                  : ""
              }
              class="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold transition"
            >
              ${project.external ? "Visit Project" : "View Case Study"}
            </a>
          </div>
        </article>
      `,
    )
    .join("");

  updateTrackPosition();
}

function updateTrackPosition() {
  if (!track) return;
  const offset = currentIndex * (getCardWidth() + GAP);
  track.style.transform = `translateX(-${offset}px)`;
}

function adjustForScreenSize() {
  const width = window.innerWidth;

  if (width < 640) {
    projectsPerPage = 1;
  } else if (width < 1024) {
    projectsPerPage = 2;
  } else {
    projectsPerPage = 3;
  }

  currentIndex = 0;
  renderProjects();
}

function initCarouselControls() {
  if (prevProjectBtn) {
    prevProjectBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex === 0
          ? Math.max(projects.length - projectsPerPage, 0)
          : currentIndex - 1;

      updateTrackPosition();
    });
  }

  if (nextProjectBtn) {
    nextProjectBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex >= projects.length - projectsPerPage
          ? 0
          : currentIndex + 1;

      updateTrackPosition();
    });
  }
}

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const honey = contactForm.querySelector('input[name="website"]');
    if (honey && honey.value) return;

    contactForm.classList.add("hidden");

    if (formSuccess) {
      formSuccess.classList.remove("hidden");
    }

    if (formStatus) {
      formStatus.textContent = "";
    }

    setTimeout(() => {
      contactForm.reset();

      if (formSuccess) {
        formSuccess.classList.add("hidden");
      }

      contactForm.classList.remove("hidden");
    }, 3000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initLucide();
  initMobileMenu();
  initCarouselControls();
  initContactForm();
  adjustForScreenSize();
});

window.addEventListener("resize", adjustForScreenSize);
