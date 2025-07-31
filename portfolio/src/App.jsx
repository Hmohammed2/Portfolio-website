import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HamzaM from "./assets/HamzaM.jpg";
import { Code, Server, BarChart, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import axios from 'axios';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full shadow-lg top-0 z-50 bg-gray-800 fixed bg-opacity-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <h1 className="text-2xl font-bold text-white">HamzaM</h1>

        {/* Spacer to create space in the center */}
        <div className="flex-1"></div>

        {/* Hamburger button visible on mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white transition">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Navigation links aligned to the right */}
        <ul
          className={`${isOpen ? "flex flex-col" : "hidden"} md:flex md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ml-auto`}
        >
          <li className="p-4">
            <a href="#projects" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
              Projects
            </a>
          </li>
          <li className="p-4">
            <a href="#about" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
              About Me
            </a>
          </li>
          <li className="p-2">
            <button className='px-2 py-2 shadow-lg rounded-lg bg-yellow-500 hover:bg-yellow-600'>
              <a href="#contact" className="text-black font-semibold transition">
                Contact Me!
              </a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <header id="home" className="text-center max-w-3xl mx-auto py-20 md:py-40 px-6">
      <div className="inline-block px-4 shadow-lg rounded-full bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4 mt-4">Hi, I am Hamza!</h2>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-4">Welcome to My Portfolio</h1>
      <p className="text-lg text-gray-400 mb-6 px-4">
        Welcome to my digital space! I'm Hamza, a full stack developer passionate about crafting seamless web experiences and empowering seamless digital experiences through expert full-stack development and robust API integrations.
      </p>
      <div className="space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition mb-4">
          <a href="#projects">View Projects</a>
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition">
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </button>
      </div>
    </header>
  );
}

const projects = [
  {
    img: "/assets/ResumeLogo.webp",
    title: "AIElevateCV",
    description: "A Web tool that optimizes and tailors resume based on job description.",
    link: "https://aielevatecv.com",
  },
  {
    img: "/assets/Geocode.PNG",
    title: "SimpleGeoAPI",
    description: "An API for seamless geographic data integration.",
    link: "https://simplegeoapi.com",
  },
  {
    img: "/assets/Talibah.png",
    title: "Talibah Match",
    description: "A matrimonial platform for matching muslims seeking knowledge.",
    link: "https://talibah.co.uk",
  },
  {
    img: "/assets/tutor-search.png",
    title: "Harambee Tutors",
    description: "An online tutoring service for students.",
    link: "https://harambeedevops.com",
  },
  {
    img: "/assets/tcpcomm.gif",
    title: "Lightweight TCP Server with HTTP Handling",
    description: "This project is a lightweight TCP server built using Node.js, designed to handle incoming client connections efficiently",
    link: "https://github.com/Hmohammed2/HTTP_Server",
  },
  {
    img: "/assets/project-overview.png",
    title: "Pinterest Data Pipeline",
    description: "This project involved replicating Pinterests end to end data processing pipeline in Python. It is implemented based on Lambda architecture that utilises both batch and stream processing",
    link: "https://github.com/Hmohammed2/Pinterest_Data_pipeline",
  },
];

function ProjectsSection() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [index, setIndex] = useState(0);

  // Tailwind's gap-6 is roughly 24px (1.5rem) at a 16px base.
  const GAP = 24;

  // Update containerWidth on mount and when the window is resized.
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Dynamically update projectsPerPage based on viewport width.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile: 1 project per view.
        setProjectsPerPage(1);
      } else if (window.innerWidth < 768) {
        // Small screens: 2 projects per view.
        setProjectsPerPage(2);
      } else {
        // Medium and larger: 3 projects per view.
        setProjectsPerPage(3);
      }
      setIndex(0); // Reset carousel index on breakpoint change.
    };

    window.addEventListener('resize', handleResize);
    // Initial check.
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the width of each card by subtracting the total gap between cards.
  const cardWidth = containerWidth
    ? (containerWidth - (projectsPerPage - 1) * GAP) / projectsPerPage
    : 0;

  // Slide one card at a time.
  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - projectsPerPage : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex >= projects.length - projectsPerPage ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="projects" className="max-w-4xl mx-auto py-10" data-aos="fade-up">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Projects</h2>
        <p className="text-gray-400 text-sm md:text-base mb-6">
          A showcase of my latest work and projects.
        </p>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition z-50"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel viewport */}
          <div className="overflow-hidden w-full" ref={containerRef}>
            {/* Flex container with gap */}
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * (cardWidth + GAP)}px)` }}
            >
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700 p-4 rounded text-center flex-shrink-0"
                  style={{ width: cardWidth }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-auto mx-auto rounded-md object-cover"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-bold mt-3">{project.title}</h3>
                  <p className="text-gray-300 mt-2">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition"
                  >
                    Visit Website
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition z-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

function AboutSection() {
  return (
    <section id="about" className="max-w-4xl mx-auto py-20" data-aos="fade-up">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-2/3 md:pr-8 mt-5">
          <h2 className="text-3xl font-semibold mb-4">Hi, I'm Hamza!</h2>
          <p className="text-gray-400">
            I'm a passionate <strong>Full-Stack Developer</strong> with over <strong>two years of experience</strong> in building dynamic, high-performance web applications. Specializing in <strong>React, Node.js, and Python</strong>, I craft seamless user experiences while developing scalable backend solutions.
          </p>
          <p className="text-gray-400 mt-4">
            My expertise extends beyond traditional web development—I have a strong background in <strong>web scraping and data extraction</strong>, helping businesses harness valuable insights to drive growth and efficiency.
          </p>
          <p className="text-gray-400 mt-4">
            From startups looking for a <strong>robust web presence</strong> to enterprises aiming to <strong>streamline their operations</strong>, I am dedicated to delivering <strong>precision, innovation, and impact</strong> in every project.
          </p>
          <p className="mt-4 text-gray-400">
            Let's build something amazing together!
          </p>
          <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 mt-4 rounded-lg shadow-lg">
            <a href="#contact">Contact me</a>
          </button>
        </div>
        {/* Image */}
        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
          <img
            src={HamzaM}
            alt="Hamza M"
            className="w-48 h-48 rounded-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="max-w-4xl mx-auto py-20" data-aos="fade-up">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Services</h2>
        <p className="text-gray-400 mb-6">
          I offer a range of services to help you build your digital presence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-4 rounded flex flex-col items-center">
            <Code className="w-12 h-12 text-blue-400 mb-3" />
            <h3 className="text-xl font-bold">Web Development</h3>
            <p className="text-gray-300 mt-2">Building responsive and dynamic websites.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded flex flex-col items-center">
            <Server className="w-12 h-12 text-green-400 mb-3" />
            <h3 className="text-xl font-bold">API Integration & Development</h3>
            <p className="text-gray-300 mt-2">
              Seamlessly integrating APIs and developing custom solutions for enhanced functionality.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded flex flex-col items-center">
            <BarChart className="w-12 h-12 text-yellow-400 mb-3" />
            <h3 className="text-xl font-bold">Data Analysis</h3>
            <p className="text-gray-300 mt-2">
              Transforming raw data into actionable insights for informed decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/send-email`,
        formData
      );

      if (response.status === 200) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Failed to send message. Try again later.");
    }
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto py-20">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center animate-fadeIn">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-400 mb-6">
          Get in touch to discuss your next project or ask any questions. Or alternatively, you can email me at:  
          <a
            href="mailto:hamza_mohammed15@hotmail.com"
            className="text-blue-400 underline hover:text-blue-300"
          >
           hamza_mohammed15@hotmail.com
          </a>.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded bg-gray-700 text-white"
            id="name"
          />
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded bg-gray-700 text-white"
            id="email"
          />
          <textarea
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 rounded bg-gray-700 text-white"
            rows="4"
            id="message"
          ></textarea>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Send Message
          </button>
          {status && <p className="text-center mt-4">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function TechnologySection() {
  const frontendTech = [
    { name: 'React', img: '/assets/react.svg' },
    { name: 'HTML', img: '/assets/html.svg' },
    { name: 'Javascript', img: '/assets/javascript.svg' },
    { name: 'Tailwind CSS', img: '/assets/tailwind.svg' },
    // add more frontend technologies as needed
  ];

  const backendTech = [
    { name: 'Nodejs', img: '/assets/nodejs.svg' },
    { name: 'Python', img: '/assets/python.svg' },
    { name: 'Django', img: '/assets/django.svg' },
    { name: 'Docker', img: '/assets/docker.svg' },
    // add more backend technologies as needed
  ];

  return (
    <section id="technologies" className="max-w-4xl mx-auto py-20" data-aos="fade-up">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Technologies I Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Technologies */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Frontend Technologies</h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {frontendTech.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img src={tech.img} alt={tech.name} className="w-16 h-16 object-contain bg-white shadow-lg rounded-md" />
                  <span className="mt-2 text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Backend Technologies */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Backend Technologies</h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {backendTech.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img src={tech.img} alt={tech.name} className="w-16 h-16 object-contain bg-white shadow-lg rounded-md" />
                  <span className="mt-2 text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="#home" className="text-gray-300 hover:text-indigo-200 transition duration-200">
            Home
          </a>
          <a href="#projects" className="text-gray-300 hover:text-indigo-200 transition duration-200">
            Projects
          </a>
          <a href="#about" className="text-gray-300 hover:text-indigo-200 transition duration-200">
            About
          </a>
          <a href="#services" className="text-gray-300 hover:text-indigo-200 transition duration-200">
            Services
          </a>
          <a href="#contact" className="text-gray-300 hover:text-indigo-200 transition duration-200">
            Contact
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/hamza-mohammed-52979bbb/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            {/* LinkedIn Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8c1.104 0 2 0.896 2 2s-0.896 2-2 2-2-0.896-2-2 0.896-2 2-2zM4 4h2v16H4zm8 0h2v16h-2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-gray-900 text-white">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ServicesSection />
        <TechnologySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
