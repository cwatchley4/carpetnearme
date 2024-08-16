"use strict";

const currentPage = document.documentElement.getAttribute("data-page");

/* DROPDOWN MENU NAV */

const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtnIcon = document.querySelector(".toggle-btn i");
const mobileNav = document.querySelector(".mobile-nav");
const hero = document.querySelector(".hero");
const pageHero = document.querySelector(".page-hero");
const mainHeader = document.querySelector(".main-header");

const toggleMobileNav = function () {
  mobileNav.classList.toggle("open");
};

const changeToggleBtnIcon = function () {
  const isOpen = mobileNav.classList.contains("open");
  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

toggleBtn.addEventListener("click", function () {
  toggleMobileNav();
  changeToggleBtnIcon();
});

const headerHeight = mainHeader.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting === true) {
    mainHeader.classList.add("sticky");
  } else {
    mainHeader.classList.remove("sticky");
  }
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

if (hero) navObserver.observe(hero);
if (pageHero) navObserver.observe(pageHero);

// HOME PAGE BACKGROUND SLIDER

const photos = [
  "backgrounds/hero-backgrounds/img1.jpg",
  "backgrounds/hero-backgrounds/img2.jpg",
  "backgrounds/hero-backgrounds/img3.jpg",
  "backgrounds/hero-backgrounds/img4.jpg",
  "backgrounds/hero-backgrounds/img5.jpg",
  "backgrounds/hero-backgrounds/img6.jpg",
  "backgrounds/hero-backgrounds/img7.jpg",
  "backgrounds/hero-backgrounds/img8.jpg",
  "backgrounds/hero-backgrounds/img9.jpg",
  "backgrounds/hero-backgrounds/img10.jpg",
  "backgrounds/hero-backgrounds/img11.jpg",
  "backgrounds/hero-backgrounds/img12.jpg",
  "backgrounds/hero-backgrounds/img13.jpg",
];

let currentPhoto = 0;

// Function to preload a single image and return a Promise
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

// Function to preload all images and return a Promise that resolves when all images are loaded
const preloadAllImages = (imageArray) => {
  return Promise.all(imageArray.map((src) => preloadImage(src)));
};

// Change background function with smooth transition
function changeBackground() {
  hero.style.backgroundImage = `url(${photos[currentPhoto]})`;
  currentPhoto = (currentPhoto + 1) % photos.length;
}

// Preload images and start the slider once all images are loaded
preloadAllImages(photos)
  .then(() => {
    setInterval(changeBackground, 5000); // Change image every 5 seconds
    changeBackground(); // Initial background image
  })
  .catch((error) => {
    console.error("Image failed to load", error);
  });
/* MODALS */

const overlay = document.querySelector(".overlay");
const servicesModal = document.querySelectorAll(".modal");
const servicesModalBtn = document.querySelectorAll(".modal-btn");
const servicesCloseModalBtn = document.querySelectorAll(".modal i");

const openModal = (modal) => {
  if (modal.classList.contains("hidden")) modal.classList.remove("hidden");
  overlay.style.opacity = 100;
  overlay.style.zIndex = 2;

  document.querySelector("body").style.overflow = "hidden";
};

const closeModal = (modal) => {
  if (!modal.classList.contains("hidden")) modal.classList.add("hidden");
  overlay.style.opacity = 0;
  overlay.style.zIndex = -1;
  document.querySelector("body").style.overflow = "";
};

// SERVICES MODALS

if (servicesModal) {
  servicesModal.forEach((modal) => {
    servicesModalBtn.forEach((learnMoreBtn) => {
      learnMoreBtn.addEventListener("click", function () {
        openModal(modal);
      });
    });
    servicesCloseModalBtn.forEach((closeBtn) => {
      closeBtn.addEventListener("click", function () {
        closeModal(modal);
      });
    });
    overlay.addEventListener("click", function () {
      closeModal(modal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal(modal);
    });
  });
}

/* ACCORDIANS */

/* ACCORDION STRUCTURE DEFINITION */

if (currentPage === "home") {
  const accordions = [
    {
      id: "consultation",
      accordion: null,
      button: null,
      text: null,
    },
    {
      id: "estimates",
      accordion: null,
      button: null,
      text: null,
    },
    {
      id: "installation",
      accordion: null,
      button: null,
      text: null,
    },
    {
      id: "follow-up",
      accordion: null,
      button: null,
      text: null,
    },
  ];

  /* INITIALIZE ACCORDION COMPONENTS */
  accordions.forEach((acc) => {
    acc.accordion = document.querySelector(`#${acc.id}`);
    acc.button = document.querySelector(`#${acc.id} i`);
    acc.text = document.querySelector(`#${acc.id} p`);
  });

  /* TOGGLE BUTTON ARROW FUNCTION */
  const toggleBtnArrow = (text, btn) => {
    const isClosed = text.classList.contains("hidden");
    btn.className = isClosed
      ? "fa-solid fa-chevron-down"
      : "fa-solid fa-chevron-up";
  };

  /* TOGGLE ACCORDION FUNCTION */
  const toggleAccordion = (current) => {
    current.text.classList.toggle("hidden");
    accordions.forEach((acc) => {
      if (acc.id !== current.id) {
        acc.text.classList.add("hidden");
      }
    });
    toggleBtnArrow(current.text, current.button);
  };

  /* ATTACH EVENT LISTENERS TO ACCORDION BUTTONS */
  accordions.forEach((acc) => {
    acc.button.addEventListener("click", () => {
      toggleAccordion(acc);
      accordions.forEach((otherAcc) =>
        toggleBtnArrow(otherAcc.text, otherAcc.button)
      );
    });
  });
}

// GALLERY PAGE IMAGE SLIDER

// Slider 1
if (currentPage === "carpet") {
  const slider = function () {
    const imageList = document.querySelector(".image-list");
    const sliderButtons = document.querySelectorAll(".slider-btn");
    const sliderScrollBar = document.querySelector(".slider-scrollbar");
    const scrollBarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
    scrollBarThumb.addEventListener("mousedown", function (e) {
      const startX = e.clientX;
      const thumbPosition = scrollBarThumb.offsetLeft;

      // Update thumb position on mouse move
      const handleMouseMove = function (e) {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxThumbPosition =
          sliderScrollBar.getBoundingClientRect().width -
          scrollBarThumb.offsetWidth;

        const boundedPosition = Math.max(
          0,
          Math.min(maxThumbPosition, newThumbPosition)
        );
        const scrollPosition =
          (boundedPosition / maxThumbPosition) * maxScrollLeft;

        scrollBarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
      };

      // Remove event listeners on mouse up
      const handleMouseUp = function () {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      // Event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    sliderButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });

    const handleSlideButtons = function () {
      sliderButtons[0].style.display =
        imageList.scrollLeft <= 0 ? "none" : "block";
      sliderButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateScrollThumbPosition = function () {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
      scrollBarThumb.style.left = `${thumbPosition}px`;
    };

    imageList.addEventListener("scroll", function () {
      handleSlideButtons();
      updateScrollThumbPosition();
    });
  };
  window.addEventListener("load", function () {
    slider();
  });
}

// Slider 2

if (currentPage === "vinyl") {
  const slider2 = function () {
    const imageList2 = document.querySelector(".image-list2");
    const sliderButtons2 = document.querySelectorAll(".slider-btn2");
    const sliderScrollBar2 = document.querySelector(".slider-scrollbar2");
    const scrollBarThumb2 = document.querySelector(".scrollbar-thumb2");
    const maxScrollLeft2 = imageList2.scrollWidth - imageList2.clientWidth;

    // Handle scrollbar thumb drag
    scrollBarThumb2.addEventListener("mousedown", function (e) {
      const startX = e.clientX;
      const thumbPosition = scrollBarThumb2.offsetLeft;

      // Update thumb position on mouse move
      const handleMouseMove = function (e) {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxThumbPosition =
          sliderScrollBar2.getBoundingClientRect().width -
          scrollBarThumb2.offsetWidth;

        const boundedPosition = Math.max(
          0,
          Math.min(maxThumbPosition, newThumbPosition)
        );
        const scrollPosition =
          (boundedPosition / maxThumbPosition) * maxScrollLeft2;

        scrollBarThumb2.style.left = `${boundedPosition}px`;
        imageList2.scrollLeft = scrollPosition;
      };

      // Remove event listeners on mouse up
      const handleMouseUp = function () {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      // Event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    sliderButtons2.forEach((button) => {
      button.addEventListener("click", function () {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList2.clientWidth * direction;
        imageList2.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });

    const handleSlideButtons = function () {
      sliderButtons2[0].style.display =
        imageList2.scrollLeft <= 0 ? "none" : "block";
      sliderButtons2[1].style.display =
        imageList2.scrollLeft >= maxScrollLeft2 ? "none" : "block";
    };

    const updateScrollThumbPosition = function () {
      const scrollPosition = imageList2.scrollLeft;
      const thumbPosition =
        (scrollPosition / maxScrollLeft2) *
        (sliderScrollBar2.clientWidth - scrollBarThumb2.offsetWidth);
      scrollBarThumb2.style.left = `${thumbPosition}px`;
    };

    imageList2.addEventListener("scroll", function () {
      handleSlideButtons();
      updateScrollThumbPosition();
    });
  };

  window.addEventListener("load", function () {
    slider2();
  });
}
