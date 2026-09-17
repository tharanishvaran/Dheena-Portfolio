import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Move cursor with mouse
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    // Add hover effect for interactive elements
    const handleHoverIn = () => cursor.classList.add('hovered')
    const handleHoverOut = () => cursor.classList.remove('hovered')

    window.addEventListener('mousemove', moveCursor)
    
    const interactables = document.querySelectorAll('a, button, input')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor"></div>
  )
}
