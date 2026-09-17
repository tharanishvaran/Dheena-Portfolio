import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProgressBar.css'

export default function ProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    gsap.to(barRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })
  }, [])

  return (
    <div className="progress-bar-container">
      <div ref={barRef} className="progress-bar"></div>
    </div>
  )
}
