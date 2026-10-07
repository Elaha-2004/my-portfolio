/* =========================================================
   NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", isOpen);

  menuButton.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

/* =========================================================
   HEADER ON SCROLL
========================================================= */

const header = document.querySelector(".header");

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navItems.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.3,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / documentHeight) * 100;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);

updateScrollProgress();

/* =========================================================
   MOUSE PARALLAX FOR HERO
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

const floatingCards = document.querySelectorAll(".floating-card");

if (heroVisual && window.matchMedia("(pointer:fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    floatingCards.forEach((card, index) => {
      const amount = index === 0 ? 12 : -12;

      card.style.transform = `translate(${x * amount}px, ${y * amount}px)`;
    });
  });

  heroVisual.addEventListener("mouseleave", () => {
    floatingCards.forEach((card) => {
      card.style.transform = "";
    });
  });
}

/* =========================================================
   SKILL CARD TILT
========================================================= */

const skillCards = document.querySelectorAll(".skill-card");

if (window.matchMedia("(pointer:fine)").matches) {
  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 5;

      const rotateX = (y / rect.height - 0.5) * -5;

      card.style.transform = `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================================================
   PROJECT IMAGE MOUSE EFFECT
========================================================= */

const projectImages = document.querySelectorAll(".project-image");

if (window.matchMedia("(pointer:fine)").matches) {
  projectImages.forEach((image) => {
    image.addEventListener("mousemove", (event) => {
      const rect = image.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;

      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

      const img = image.querySelector("img");

      if (img) {
        img.style.transform = `scale(1.07)
                     translate(${x}px, ${y}px)`;
      }
    });

    image.addEventListener("mouseleave", () => {
      const img = image.querySelector("img");

      if (img) {
        img.style.transform = "";
      }
    });
  });
}

/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = contactForm.querySelector(".form-button");

    const originalContent = button.innerHTML;

    button.innerHTML = '<i class="fa-solid fa-check"></i> Message Ready';

    button.style.pointerEvents = "none";

    setTimeout(() => {
      button.innerHTML = originalContent;

      button.style.pointerEvents = "";
    }, 2500);
  });
}

/* =========================================================
   TEXT REVEAL ON LOAD
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
