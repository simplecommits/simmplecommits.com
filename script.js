// --------- Preloader handling ---------
window.addEventListener("load", () => {
  // Give a tiny delay for smoother transition
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 400);
});

// --------- Typing effect in hero title ---------
const typingTarget = document.getElementById("typing-text");
const cursor = document.querySelector(".cursor");

// Sentences related to Android work
const phrases = [
  "Android apps.",
  "smooth user journeys.",
  "clean, stable experiences.",
  "apps that just work."
];

let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingTarget) return;

  const currentPhrase = phrases[currentPhraseIndex];
  const displayed = currentPhrase.substring(0, charIndex);

  typingTarget.textContent = displayed;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(typeLoop, 90);
  } else if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => {
      isDeleting = true;
      typeLoop();
    }, 1100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 50);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 200);
  }
}

typeLoop();

// --------- Phone tilt effect ---------
const phoneCard = document.getElementById("phone-card");

if (phoneCard) {
  phoneCard.addEventListener("mousemove", (e) => {
    const rect = phoneCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * -10; // tilt up/down
    const rotateY = (x / rect.width) * 12; // tilt left/right

    const phone = phoneCard.querySelector(".phone");
    if (phone) {
      phone.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    }
  });

  phoneCard.addEventListener("mouseleave", () => {
    const phone = phoneCard.querySelector(".phone");
    if (phone) {
      phone.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  });
}

// --------- Scroll reveal animations ---------
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything if IntersectionObserver not supported
  revealElements.forEach((el) => el.classList.add("visible"));
}

// --------- Dynamic year in footer ---------
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
