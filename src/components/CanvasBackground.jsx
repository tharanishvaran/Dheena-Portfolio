import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const frameCount = 40;
const currentFrame = index => (
  `/assets/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
);

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images = [];
    const airpods = { frame: 0 };
    
    let lastWidth = 0;
    let lastHeight = 0;
    let cachedRatio = 1;
    let cachedShiftX = 0;
    let cachedShiftY = 0;

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function render() {
      const currentFrameIndex = Math.round(airpods.frame);
      const img = images[currentFrameIndex];
      if(!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      
      if (lastWidth !== canvas.width || lastHeight !== canvas.height) {
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          cachedRatio = Math.max(hRatio, vRatio);
          cachedShiftX = (canvas.width - img.width * cachedRatio) / 2;
          cachedShiftY = (canvas.height - img.height * cachedRatio) / 2;
          lastWidth = canvas.width;
          lastHeight = canvas.height;
      }
      
      context.drawImage(img, 0, 0, img.width, img.height,
                          cachedShiftX, cachedShiftY, img.width * cachedRatio, img.height * cachedRatio);
    }

    images[0].onload = render;

    // Animate frames using ScrollTrigger
    const animation = gsap.to(airpods, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      },
      onUpdate: render
    });

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        lastWidth = 0;
        render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      animation.kill();
    }
  }, []);

  return (
    <div className="canvas-container">
        <canvas ref={canvasRef} id="hero-lightpass"></canvas>
    </div>
  )
}
