import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frameCount = 40

function getFramePath(index) {
  const num = String(index + 1).padStart(3, '0')
  return `/assets/ezgif-frame-${num}.jpg`
}

export default function CanvasBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const images = new Array(frameCount)
    const obj = { frame: 0 }

    let loadedCount = 0
    let animationReady = false

    // Cache for cover-fit calculation
    let lastW = 0, lastH = 0
    let ratio = 1, shiftX = 0, shiftY = 0

    function render() {
      const idx = Math.min(Math.round(obj.frame), frameCount - 1)
      const img = images[idx]
      if (!img || !img.complete || img.naturalWidth === 0) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      if (lastW !== canvas.width || lastH !== canvas.height) {
        const hRatio = canvas.width / img.naturalWidth
        const vRatio = canvas.height / img.naturalHeight
        ratio = Math.max(hRatio, vRatio)
        shiftX = (canvas.width - img.naturalWidth * ratio) / 2
        shiftY = (canvas.height - img.naturalHeight * ratio) / 2
        lastW = canvas.width
        lastH = canvas.height
      }

      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
        shiftX, shiftY, img.naturalWidth * ratio, img.naturalHeight * ratio)
    }

    function setupScrollTrigger() {
      gsap.to(obj, {
        frame: frameCount - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.content',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        onUpdate: render,
      })
    }

    // Load all frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        // Render first frame as soon as it is ready
        if (i === 0) render()
        // Once ALL frames are loaded, hook up ScrollTrigger
        if (loadedCount === frameCount && !animationReady) {
          animationReady = true
          setupScrollTrigger()
        }
      }
      img.onerror = () => {
        console.error(`Failed to load frame: ${getFramePath(i)}`)
        loadedCount++
        if (loadedCount === frameCount && !animationReady) {
          animationReady = true
          setupScrollTrigger()
        }
      }
      img.src = getFramePath(i)
      images[i] = img
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      lastW = 0
      render()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} id="hero-lightpass" />
    </div>
  )
}
