import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Section({ id, align = 'left', children }) {
  const blockRef = useRef(null)

  useEffect(() => {
    const block = blockRef.current
    if (!block) return

    const childrenElements = block.children

    // 1. Text reveal stagger animation
    const animation = gsap.fromTo(childrenElements, 
        { y: 60, opacity: 0, scale: 0.95, skewY: 2 },
        {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "top 30%",
                scrub: 1.5
            },
            y: 0,
            opacity: 1,
            scale: 1,
            skewY: 0,
            ease: "power3.out",
            stagger: 0.2
        }
    )

    // 2. Container Parallax Effect
    const parallax = gsap.to(block, {
      yPercent: -15, // Move up slightly faster than scroll
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    return () => {
      animation.kill()
      parallax.kill()
    }
  }, [])

  return (
    <section className="step" id={id}>
      <div ref={blockRef} className={`text-block ${align === 'right' ? 'right' : ''}`}>
        {children}
      </div>
    </section>
  )
}
