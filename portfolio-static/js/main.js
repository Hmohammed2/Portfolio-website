const projects = [
  {
    img: "assets/Arcadesticklabs-logo.webp",
    title: "ArcadeStickLabs",
    description:
      "An e-commerce platform specializing in custom arcade sticks and gaming accessories.",
    link: "https://arcadesticklabs.co.uk",
  },
  {
    img: "assets/ResumeLogo.webp",
    title: "AIElevateCV",
    description:
      "A Web tool that optimizes and tailors resume based on job description.",
    link: "https://aielevatecv.com",
  },
  {
    img: "assets/Geocode.PNG",
    title: "SimpleGeoAPI",
    description:
      "An API for seamless geographic data integration and POI analysis",
    link: "https://simplegeoapi.com",
  },
  {
    img: "assets/Talibah.png",
    title: "Talibah Match",
    description:
      "A matrimonial platform for matching muslims seeking knowledge.",
    link: "https://talibah.co.uk",
  },
  {
    img: "assets/tutor-search.png",
    title: "Harambee Tutors",
    description:
      "An online tutoring service project for students & tutors alike.",
    link: "https://harambeedevops.com",
  },
  {
    img: "assets/tcpcomm.gif",
    title: "Lightweight TCP Server with HTTP Handling",
    description:
      "This project is a lightweight TCP server built using Node.js, designed to handle incoming client connections efficiently",
    link: "https://github.com/Hmohammed2/HTTP_Server",
  },
  {
    img: "assets/project-overview.png",
    title: "Pinterest Data Pipeline",
    description:
      "This project involved replicating Pinterests end to end data processing pipeline in Python. It is implemented based on Lambda architecture that utilises both batch and stream processing",
    link: "https://github.com/Hmohammed2/Pinterest_Data_pipeline",
  },
  // Add more project objects here
];

const track = document.getElementById("projects-track");
const container = document.getElementById("projects-container");

let currentIndex = 0;
let projectsPerPage = 3;
const GAP = 24;

function renderProjects() {
  track.innerHTML = projects
    .map(
      (project) => `
    <div class="bg-gray-700 p-4 rounded text-center flex-shrink-0" style="width: ${getCardWidth()}px">
      <img src="${project.img}" alt="${
        project.title
      }" class="w-full h-auto mx-auto rounded-md object-cover" loading="lazy" />
      <h3 class="text-xl font-bold mt-3">${project.title}</h3>
      <p class="text-gray-300 mt-2">${project.description}</p>
      <a href="${
        project.link
      }" target="_blank" class="mt-4 inline-block bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition">Visit Website</a>
    </div>
  `
    )
    .join("");
  updateTrackPosition();
}

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 1000, once: false, mirror: true });

  const toggleBtn = document.getElementById("menu-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMenu);
  }

  // Close mobile nav on link click (only for small screens)
  const navLinks = document.querySelectorAll("#nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("nav-menu");
      if (window.innerWidth < 768) {
        menu.classList.add("hidden");
      }
    });
  });
});

function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("hidden");
}

function getCardWidth() {
  const containerWidth = container.offsetWidth;
  return (containerWidth - (projectsPerPage - 1) * GAP) / projectsPerPage;
}

function updateTrackPosition() {
  const offset = currentIndex * (getCardWidth() + GAP);
  track.style.transform = `translateX(-${offset}px)`;
}

function adjustForScreenSize() {
  const width = window.innerWidth;
  if (width < 640) {
    projectsPerPage = 1;
  } else if (width < 768) {
    projectsPerPage = 2;
  } else {
    projectsPerPage = 3;
  }
  currentIndex = 0;
  renderProjects();
}

document.getElementById("prev-project").addEventListener("click", () => {
  currentIndex =
    currentIndex === 0 ? projects.length - projectsPerPage : currentIndex - 1;
  updateTrackPosition();
});

document.getElementById("next-project").addEventListener("click", () => {
  currentIndex =
    currentIndex >= projects.length - projectsPerPage ? 0 : currentIndex + 1;
  updateTrackPosition();
});

window.addEventListener("resize", adjustForScreenSize);
window.addEventListener("DOMContentLoaded", adjustForScreenSize);
