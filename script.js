// Initialize Lenis for smooth scrolling
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

// Get ScrollTrigger to sync with Lenis
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Setup Canvas Image Sequence Scrubbing
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 40;
const currentFrame = index => (
  `assets/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = []
const airpods = {
  frame: 0
};

// Preload all images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw the first frame when loaded
images[0].onload = render;

// Render function
let lastWidth = 0;
let lastHeight = 0;
let cachedRatio = 1;
let cachedShiftX = 0;
let cachedShiftY = 0;

function render() {
  const currentFrame = Math.round(airpods.frame);
  const img = images[currentFrame];
  if(!img) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calculate aspect ratio only when resize happens or first time
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

// Animate frames using ScrollTrigger
gsap.to(airpods, {
  frame: frameCount - 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".content",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.5 // Increased scrub for smoother interpolation
  },
  onUpdate: render
});

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lastWidth = 0; // force recalculate
    render();
});

// Animate text elements individually for a staggered effect
const textBlocks = gsap.utils.toArray('.text-block');
textBlocks.forEach((block, i) => {
    const children = block.children; // Select all elements inside the block
    gsap.fromTo(children, 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "top 30%",
                scrub: 1
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.2 // Stagger the animation of each child element
        }
    );
});
