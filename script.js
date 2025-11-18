// When page fully loads
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  const wrapper = document.querySelector(".page-wrapper");

  // Hide preloader
  setTimeout(() => {
    preloader.classList.add("hidden");
    wrapper.classList.add("visible");
  }, 800); // small delay to let the animation play
});

// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Simple typing effect in the fake terminal
  const typingSpan = document.querySelector(".typing-text");
  const text = 'initial commit: "simple, clean, commits"';
  let index = 0;

  function type() {
    if (!typingSpan) return;

    if (index <= text.length) {
      typingSpan.textContent = text.slice(0, index);
      index++;
    } else {
      // pause and restart typing
      setTimeout(() => {
        index = 0;
        typingSpan.textContent = "";
      }, 1800);
    }
  }

  setInterval(type, 80);

  // Intersection observer for scroll animations
  const animatedEls = document.querySelectorAll(
    ".slide-up, .slide-in-right, .fade-in, .float-up"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible-anim");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedEls.forEach((el) => observer.observe(el));

  // Toast for "Notify me" button
  const notifyBtn = document.getElementById("notifyBtn");
  const toast = document.getElementById("toast");
  let toastTimeout = null;

  if (notifyBtn && toast) {
    notifyBtn.addEventListener("click", () => {
      toast.classList.add("show");

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
      }, 2600);
    });
  }
});
