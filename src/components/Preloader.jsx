import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Preloader.css'

export default function Preloader() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const chars = textRef.current.children

    const tl = gsap.timeline()

    // 1. Stagger letters up
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.05
    })
    
    // 2. Wait a tiny bit, then slide letters out
    tl.to(chars, {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
      stagger: 0.02,
      delay: 0.5
    })

    // 3. Slide the entire black screen up to reveal the site
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut"
    })

  }, [])

  const title = "DHEENA".split("")

  return (
    <div ref={containerRef} className="preloader">
      <div ref={textRef} className="preloader-text">
        {title.map((char, index) => (
          <span key={index} className="char">
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
