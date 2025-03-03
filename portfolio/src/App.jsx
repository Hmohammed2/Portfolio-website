import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HamzaM from "./assets/HamzaM.jpg"
import { Code, Server, BarChart } from "lucide-react";
import axios from 'axios'

function Navbar() {
  return (
    <nav className="w-full shadow-lg top-0 z-50 bg-gray-800 fixed bg-opacity-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="text-gray-300 hover:text-white transition">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="text-gray-300 hover:text-white transition">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="text-gray-300 hover:text-white transition">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="text-gray-300 hover:text-white transition">
              Services
            </a>
          </li>

          <li>
            <a href="#contact" className="text-gray-300 hover:text-white transition">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <header id="home" className="text-center max-w-3xl mx-auto py-80">
      <div className='inline-block px-4 shadow-lg rounded-full bg-gray-800'>
        <h2 className='text-2xl font-semibold mb-4 mt-4'>Hi i am Hamza!</h2>
      </div>
      <h1 className="text-5xl font-bold mb-4 mt-4">Welcome to My Portfolio</h1>
      <p className="text-lg text-gray-400 mb-6">
        Empowering seamless digital experiences through expert full-stack development and robust API integrations.
      </p>
      <div className='space-x-4'>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition mb-4">
          <a href="#projects">View Projects</a>
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
        </button>
      </div>
    </header>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="max-w-4xl mx-auto py-10" data-aos='fade-up'>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        <p className="text-gray-400 mb-6">
          A showcase of my latest work and projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-xl font-bold">Project One</h3>
            <p className="text-gray-300 mt-2">Brief description of the project.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-xl font-bold">Project Two</h3>
            <p className="text-gray-300 mt-2">Brief description of the project.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-xl font-bold">Project three</h3>
            <p className="text-gray-300 mt-2">Brief description of the project.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="max-w-4xl mx-auto py-20" data-aos='fade-in'>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-2/3 md:pr-8 mt-5">
          <h2 className="text-3xl font-semibold mb-4">Hi, I'm Hamza!</h2>
          <p className="text-gray-400">
            I'm a passionate <strong>Full-Stack Developer</strong> with over <strong>two years of experience</strong> in building dynamic, high-performance web applications. Specializing in <strong>React, Node.js, and Python</strong>, I craft seamless user experiences while developing scalable backend solutions.
          </p>
          <p className="text-gray-400 mt-4">
            My expertise extends beyond traditional web development—I have a strong background in <strong>web scraping and data extraction</strong>, helping businesses harness valuable insights to drive growth and efficiency. Whether it's automating workflows, optimizing performance, or developing custom solutions, I thrive on turning complex challenges into elegant, functional applications.
          </p>
          <p className="text-gray-400 mt-4">
            From startups looking for a <strong>robust web presence</strong> to enterprises aiming to <strong>streamline their operations</strong>, I am dedicated to delivering <strong>precision, innovation, and impact</strong> in every project.
          </p>
          <p className="mt-4 text-gray 400">
            Let's build something amazing together!
          </p>
          <button className='py-2 px-4 bg-blue-600 hover:bg-blue-700 mt-4 rounded-lg shadow-lg'>
            <a href="#contact">Contact me</a>
          </button>
        </div>
        {/* Image */}
        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
          <img
            src={HamzaM}
            alt="Hamza M"
            className="w-48 h-48 rounded-full object-cover"
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="max-w-4xl mx-auto py-20" data-aos='fade-up'>
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
            <p className="text-gray-300 mt-2">Seamlessly integrating APIs and developing custom solutions for enhanced functionality.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded flex flex-col items-center">
            <BarChart className="w-12 h-12 text-yellow-400 mb-3" />
            <h3 className="text-xl font-bold">Data Analysis</h3>
            <p className="text-gray-300 mt-2">Transforming raw data into actionable insights for informed decision-making.</p>
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
    console.log('Button clicked')
    setStatus("Sending...");
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/send-email`, formData);

      if (response.status === 200) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Failed to send message. Try again later.");
    }
  }

  return (
    <section id="contact" className="max-w-4xl mx-auto py-20">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center animate-fadeIn">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-400 mb-6">
          Get in touch to discuss your next project or ask any questions.
        </p>
        <form className="space-y-4">
          <input type="text" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full p-3 rounded bg-gray-700 text-white" />
          <input type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full p-3 rounded bg-gray-700 text-white" />
          <textarea value={formData.message} onChange={handleChange} placeholder="Your Message" className="w-full p-3 rounded bg-gray-700 text-white" rows="4"></textarea>
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition">
            Send Message
          </button>
          {status && <p className="text-center mt-4">{status}</p>}
        </form>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r bg-gray-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 justify-between">
        {/* Flex Container */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center">
            <a href="#privacy" className="text-white hover:text-indigo-200 transition duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white hover:text-indigo-200 transition duration-200">
              Terms of Service
            </a>
            <a href="/contact" className="text-white hover:text-indigo-200 transition duration-200">
              Contact
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 4.01c-0.79 0.35-1.64 0.58-2.54 0.68 0.92-0.55 1.62-1.43 1.95-2.47-0.86 0.51-1.81 0.89-2.82 1.09-0.81-0.87-1.96-1.42-3.24-1.42-2.45 0-4.44 1.99-4.44 4.44 0 0.35 0.04 0.7 0.12 1.03-3.69-0.19-6.96-1.95-9.14-4.64-0.38 0.65-0.6 1.41-0.6 2.22 0 1.54 0.78 2.9 1.97 3.7-0.73-0.02-1.42-0.22-2.02-0.55v0.06c0 2.14 1.53 3.94 3.56 4.35-0.37 0.1-0.75 0.15-1.14 0.15-0.28 0-0.56-0.03-0.83-0.08 0.57 1.79 2.24 3.1 4.21 3.14-1.54 1.21-3.48 1.94-5.59 1.94-0.36 0-0.73-0.02-1.09-0.06 1.99 1.28 4.37 2.02 6.92 2.02 8.3 0 12.86-6.88 12.86-12.86 0-0.2-0.01-0.4-0.03-0.6 0.88-0.64 1.65-1.44 2.25-2.35z"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2h8V14h-3v-4h3V8c0-3.31 2.69-5 5-5 1.38 0 2.67.5 3.6 1.34V7h-2c-1.1 0-2 .9-2 2v3h4l-1 4h-3v8h5c1.1 0 1.99-.9 1.99-2L22 4c0-1.1-.89-2-1.99-2z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/hamza-mohammed-52979bbb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8c1.104 0 2 0.896 2 2s-0.896 2-2 2-2-0.896-2-2 0.896-2 2-2zM4 4h2v16H4zm8 0h2v16h-2z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hamza Mohammed</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
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
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
