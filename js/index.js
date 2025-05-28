const nighttheme = document.getElementsByClassName("bx-moon")[0];
const daytheme = document.getElementById("sun");
const navbar = document.getElementsByClassName("navbar")[0];
const body = document.getElementById("body");
const card_body = document.getElementsByClassName("card-body");
const progressBar = document.getElementsByClassName("progress-bar")[0];
const emailInput = document.getElementById('exampleInputEmail1')
const myName = document.getElementById('my-name');
let theme = "dark";

//Register gsap text animation and scroll trigger plugin
gsap.registerPlugin(ScrollTrigger, TextPlugin);

nighttheme.addEventListener("click", function () {
  localStorage.setItem("theme", "dark");
  daytheme.classList.toggle("d-none");
  nighttheme.classList.toggle("d-none");
  navbar.classList.toggle("nav-light");
  navbar.classList.toggle("navbg-light");
  daytheme.classList.add("text-white");
  body.classList.toggle("body");
});
daytheme.addEventListener("click", function () {
  localStorage.setItem("theme", "light");
  daytheme.classList.toggle("d-none");
  nighttheme.classList.toggle("d-none");
  navbar.classList.toggle("nav-light");
  navbar.classList.toggle("navbg-light");
  body.classList.toggle("body");
  emailInput.classList.toggle("text-white")
});

if (localStorage.getItem("theme")) {
  theme = localStorage.getItem("theme");
  if (theme == "dark") nighttheme.click();
} else {
  nighttheme.click();
}

window.addEventListener('scroll', function() {
  // Calculate the scroll progress as a percentage
  let scrollPosition = window.scrollY;
  let windowHeight = window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;
  let scrollableDistance = documentHeight - windowHeight;
  let scrollPercentage = (scrollPosition / scrollableDistance) * 100;

  // Update the width of the progress bar
  progressBar.style.width = scrollPercentage + '%';
});

document.addEventListener('DOMContentLoaded', function() {
  initializeAnimations();
});

function initializeAnimations() {
  // ===== HERO SECTION ANIMATIONS =====
  
  // Typewriter effect for name
  const names = ["WAGLE SATHWIK", "Developer", "Creator", "Coder"];
  let nameIndex = 0;
  
  function typewriterEffect() {
      const currentName = names[nameIndex];
      const nameElement = document.getElementById('my-name');
      
      // Clear previous text
      gsap.set(nameElement, { text: "" });
      
      // Typewriter animation
      gsap.to(nameElement, {
          duration: currentName.length * 0.1,
          text: currentName,
          ease: "none",
          onComplete: () => {
              // Wait, then clear and type next name
              gsap.delayedCall(2, () => {
                  gsap.to(nameElement, {
                      duration: 0.5,
                      text: "",
                      ease: "none",
                      onComplete: () => {
                          nameIndex = (nameIndex + 1) % names.length;
                          typewriterEffect();
                      }
                  });
              });
          }
      });
  }
  
  // Initial hero animations
  const heroTimeline = gsap.timeline();
  
  heroTimeline
      .from("#bracket-open", {
          duration: 0.8,
          x: -100,
          opacity: 0,
          ease: "back.out(1.7)"
      })
      .from("#bracket-close", {
          duration: 0.8,
          x: 100,
          opacity: 0,
          ease: "back.out(1.7)"
      }, "-=0.6")
      .from("#subtitle", {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power2.out"
      }, "-=0.4")
      .call(typewriterEffect, [], "-=0.2");g

  // ===== SKILLS SECTION ANIMATIONS =====
  
  // Title animation
  gsap.from("#skills-title", {
      scrollTrigger: {
          trigger: "#skills-title",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      },
      duration: 1,
      x: -50,
      opacity: 0,
      ease: "power2.out"
  });

  // Skill groups staggered animation
  gsap.from(".skill-group-hidden", {
      scrollTrigger: {
          trigger: "#skills-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      scale: 0.8,
      rotation: 10,
      stagger: 0.2,
      ease: "back.out(1.7)",
      onComplete: function() {
          // Remove hidden class after animation
          document.querySelectorAll('.skill-group-hidden').forEach(el => {
              el.classList.remove('skill-group-hidden');
          });
      },
      onStart: function() {
          // Add hover animations to skill icons
          document.querySelectorAll('.skills i').forEach(icon => {
              icon.addEventListener('mouseenter', () => {
                  gsap.to(icon, {
                      duration: 0.3,
                      scale: 1.2,
                      rotation: 360,
                      ease: "power2.out"
                  });
              });
              
              icon.addEventListener('mouseleave', () => {
                  gsap.to(icon, {
                      duration: 0.3,
                      scale: 1,
                      rotation: 0,
                      ease: "power2.out"
                  });
              });
          });
      }
  });

  // ===== PROJECTS SECTION ANIMATIONS =====
  
  // Projects title animation
  gsap.from("#projects", {
      scrollTrigger: {
          trigger: "#projects-title",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      },
      duration: 1,
      x: -50,
      opacity: 0,
      ease: "power2.out"
  });

  // Project cards 3D flip animation
  gsap.from(".project-card-hidden", {
      scrollTrigger: {
          trigger: "#projects-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      },
      duration: 1,
      y: 80,
      opacity: 0,
      rotationX: 45,
      transformOrigin: "center bottom",
      stagger: 0.2,
      ease: "power2.out",
      onComplete: function() {
          // Remove hidden class and add hover effects
          document.querySelectorAll('.project-card-hidden').forEach(card => {
              card.classList.remove('project-card-hidden');
              
              // Add hover animations
              card.addEventListener('mouseenter', () => {
                  gsap.to(card, {
                      duration: 0.3,
                      y: -10,
                      scale: 1.02,
                      ease: "power2.out"
                  });
                  
                  const img = card.querySelector('img');
                  gsap.to(img, {
                      duration: 0.3,
                      scale: 1.1,
                      ease: "power2.out"
                  });
              });
              
              card.addEventListener('mouseleave', () => {
                  gsap.to(card, {
                      duration: 0.3,
                      y: 0,
                      scale: 1,
                      ease: "power2.out"
                  });
                  
                  const img = card.querySelector('img');
                  gsap.to(img, {
                      duration: 0.3,
                      scale: 1,
                      ease: "power2.out"
                  });
              });
          });
      }
  });

  // ===== CONTACT SECTION ANIMATIONS =====
  
  // Contact section slide in animation
  gsap.from(".contact-hidden", {
      scrollTrigger: {
          trigger: ".contact-hidden",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      },
      duration: 1.2,
      x: -100,
      opacity: 0,
      ease: "power2.out",
      onComplete: function() {
          document.querySelector('.contact-hidden').classList.remove('contact-hidden');
      }
  });

  // Social icons animation
  gsap.from("#social-links a", {
      scrollTrigger: {
          trigger: "#social-links",
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      },
      duration: 0.6,
      y: 30,
      opacity: 0,
      scale: 0,
      stagger: 0.1,
      ease: "back.out(1.7)",
      onComplete: function() {
          // Add bounce animation to social icons
          document.querySelectorAll('#social-links a i').forEach(icon => {
              icon.addEventListener('mouseenter', () => {
                  gsap.to(icon, {
                      duration: 0.3,
                      scale: 1.3,
                      rotation: 15,
                      ease: "back.out(1.7)"
                  });
              });
              
              icon.addEventListener('mouseleave', () => {
                  gsap.to(icon, {
                      duration: 0.3,
                      scale: 1,
                      rotation: 0,
                      ease: "power2.out"
                  });
              });
          });
      }
  });

  // ===== FORM ANIMATIONS =====
  
  // Form input focus animations
  const formInputs = document.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
      input.addEventListener('focus', () => {
          gsap.to(input, {
              duration: 0.3,
              scale: 1.02,
              borderColor: '#6366f1',
              ease: "power2.out"
          });
      });
      
      input.addEventListener('blur', () => {
          gsap.to(input, {
              duration: 0.3,
              scale: 1,
              ease: "power2.out"
          });
      });
  });

  // ===== SCROLL-BASED ANIMATIONS =====
  
  // Parallax effect for sections
  gsap.to(".hero-text", {
      scrollTrigger: {
          trigger: ".hero-text",
          start: "top center",
          end: "bottom top",
          scrub: 1
      },
      y: -50,
      opacity: 0.8
  });

  // ===== BUTTON ANIMATIONS =====
  
  // Enhanced button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
              duration: 0.3,
              scale: 1.05,
              y: -2,
              ease: "power2.out"
          });
      });
      
      btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
              duration: 0.3,
              scale: 1,
              y: 0,
              ease: "power2.out"
          });
      });
  });

  // ===== CONTINUOUS ANIMATIONS =====
  
  // Subtle breathing animation for the entire page
  gsap.to("body", {
      scale: 1.002,
      duration: 8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
  });

  // Random floating particles effect
  createFloatingParticles();
}

// Create floating particles for background effect
function createFloatingParticles() {
  for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
          position: fixed;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
          left: ${Math.random() * 100}vw;
          top: ${Math.random() * 100}vh;
      `;
      document.body.appendChild(particle);
      
      // Animate particles
      gsap.to(particle, {
          y: -window.innerHeight - 100,
          x: Math.random() * 200 - 100,
          duration: Math.random() * 20 + 10,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 10
      });
      
      gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 3 + 1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
      });
  }
}

// Add resize handler for responsive animations
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
