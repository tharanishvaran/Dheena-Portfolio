import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CanvasBackground from './components/CanvasBackground'
import Section from './components/Section'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import ProgressBar from './components/ProgressBar'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ProgressBar />
      <CanvasBackground />
      <main className="content">
        <Section id="step-1" align="left">
          <h1>Dheenadhayalan</h1>
          <h2>Aspiring Developer & AI Enthusiast</h2>
          <p>Motivated and detail-oriented MCA student with a strong foundation in programming, databases, and modern web technologies. Passionate about building highly efficient, user-friendly applications that solve real-world problems.</p>
          <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#4facfe' }}>"Code. Learn. Build. Repeat."</p>
        </Section>

        <Section id="step-2" align="right">
          <h2>My Journey</h2>
          <p style={{ marginBottom: '1rem' }}>Ever since I wrote my first line of code, I've been fascinated by the endless possibilities of technology. I constantly push myself to learn new frameworks, optimize backend performance, and deliver pixel-perfect frontends.</p>
          <p>Whether I'm containerizing an app with Docker or building AI integrations, I treat every project as an opportunity to level up my engineering skills.</p>
        </Section>

        <Section id="step-3" align="left">
          <h2>Higher Education</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Master of Computer Applications (MCA)</h3>
            <p>Sri Manakula Vinayagar Engineering College, Puducherry<br/><small>2025 - 2027</small></p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Bachelor of Computer Applications (BCA)</h3>
            <p>Swami Vivekanandha Arts and Science College, Villupuram<br/><small>2022 - 2025</small></p>
          </div>
        </Section>

        <Section id="step-4" align="right">
          <h2>Schooling</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>HSC (12th)</h3>
            <p>Keelperumpakkam Higher Secondary School, Villupuram<br/><small>2020 - 2022</small></p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>SSLC (10th)</h3>
            <p>Mahatma Gandhi Secondary School, Villupuram<br/><small>2019 - 2020</small></p>
          </div>
        </Section>

        <Section id="step-5" align="left">
          <h2>What I Do</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Full-Stack Development</h3>
            <p>Building responsive web applications from database architecture to frontend UI using Python, React, and SQL.</p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>AI Integrations</h3>
            <p>Leveraging Large Language Models like Gemini to add intelligent, context-aware features to modern platforms.</p>
          </div>
        </Section>

        <Section id="step-6" align="right">
          <h2>Technical Toolkit</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Languages</h3>
            <p>Python, Java, C, SQL</p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Tools & Technologies</h3>
            <p>Flask, React, Docker, Git, PyCharm</p>
          </div>
        </Section>
        
        <Section id="step-7" align="left">
          <h2>Core Strengths</h2>
          <ul style={{ color: '#cccccc', marginLeft: '1.5rem', fontWeight: 300, lineHeight: 1.6 }}>
            <li>Problem Solving & Analytical Thinking</li>
            <li>Self-Taught & Quick Learner</li>
            <li>Agile Time Management</li>
            <li>Collaborative Team Player</li>
            <li>Relentless Positive Attitude</li>
          </ul>
        </Section>

        <Section id="step-8" align="right">
          <h2>Featured Projects</h2>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Needhi AI – AI-Powered Legal Assistant</h3>
            <ul style={{ color: '#cccccc', marginLeft: '1.2rem', fontWeight: 300, lineHeight: 1.5, fontSize: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Built a full-stack, bilingual (English & Tamil) AI legal platform with 13 specialized tools (FIR drafting, BNS vs IPC conversion).</li>
              <li style={{ marginBottom: '0.5rem' }}>Developed a FastAPI streaming backend with Gemini API failover caching for sub-second token delivery.</li>
              <li style={{ marginBottom: '0.5rem' }}>Implemented passwordless auth via Google OAuth 2.0 & Gmail OTP.</li>
              <li style={{ marginBottom: '0.5rem' }}>Designed a fully responsive, mobile-first interface with Dark/Light themes.</li>
              <li>Containerized with Docker and deployed to production on Render.</li>
            </ul>
            <p style={{ marginTop: '0.8rem' }}>
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', marginRight: '5px' }}>FastAPI</small>
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', marginRight: '5px' }}>Gemini AI</small>
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', marginRight: '5px' }}>Docker</small>
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>OAuth 2.0</small>
            </p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Fitness Tracker (Web App)</h3>
            <p>Developed a web application to track daily fitness activities, including steps, calories burnt, and progress visualization.</p>
            <p style={{ marginTop: '0.5rem' }}>
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', marginRight: '5px' }}>Python Flask</small> 
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', marginRight: '5px' }}>HTML</small> 
              <small style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>SQL</small>
            </p>
          </div>
        </Section>

        <Section id="step-9" align="left">
          <h2>Hackathons & Awards</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>[Placeholder] AI Hackathon 2024</h3>
            <p>Led a team of 4 to build an innovative AI solution over 48 hours. Secured top 10 finalist position among 500+ teams.</p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>[Placeholder] Best Capstone Project</h3>
            <p>Awarded highest grade for developing a scalable e-commerce microservices architecture during final year.</p>
          </div>
        </Section>

        <Section id="step-10" align="right">
          <h2>Interests & Hobbies</h2>
          <ul style={{ color: '#cccccc', marginLeft: '1.5rem', fontWeight: 300, lineHeight: 1.6 }}>
            <li>Coding & Open Source Contributions</li>
            <li>Reading Emerging Tech Blogs</li>
            <li>Exploring New SaaS Tools</li>
            <li>Sports, Fitness, and Wellbeing</li>
          </ul>
        </Section>

        <Section id="step-11" align="left">
          <h2>Personal Info</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Career Goal</h3>
            <p>To secure a challenging career in a reputed organization and contribute to innovative technology solutions while continuously evolving as an engineer.</p>
          </div>
          <div>
            <h3 style={{ color: '#00f2fe', marginBottom: '0.5rem' }}>Languages Spoken</h3>
            <p>Tamil (Native), English (Professional)</p>
          </div>
        </Section>

        <Section id="step-12" align="right">
          <h2>Contact & Connect</h2>
          <ul style={{ color: '#cccccc', listStyle: 'none', fontWeight: 300, lineHeight: 2 }}>
            <li>📱 +91 9952416809</li>
            <li>✉️ dheenadhayalan21@gmail.com</li>
            <li>📍 Villupuram, Tamil Nadu, India</li>
            <li>🔗 <a href="https://github.com/dheena21-tech" style={{ color: '#4facfe', textDecoration: 'none' }}>github.com/dheena21-tech</a></li>
            <li>💼 <a href="https://linkedin.com/in/dheenadhayalan" style={{ color: '#4facfe', textDecoration: 'none' }}>linkedin.com/in/dheenadhayalan</a></li>
          </ul>
          <a href="mailto:dheenadhayalan21@gmail.com" className="cta-button">Get in Touch</a>
        </Section>
      </main>
    </>
  )
}

export default App
