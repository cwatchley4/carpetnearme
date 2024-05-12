"use strict";

const currentPage = document.documentElement.getAttribute("data-page");

/* DROPDOWN MENU NAV */

const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtnIcon = document.querySelector(".toggle-btn i");
const mobileNav = document.querySelector(".mobile-nav");

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
  console.log("clicked");
});

/* SERVICES MODALS */

if (currentPage === "home") {
  const overlay = document.querySelector(".overlay");
  const servicesModal = document.querySelectorAll(".modal");
  const servicesModalBtn = document.querySelectorAll(".modal-btn");
  const servicesCloseModalBtn = document.querySelectorAll(".modal i");

  const openModal = (modal) => {
    if (modal.classList.contains("hidden")) modal.classList.remove("hidden");
    if (overlay.classList.contains("hidden"))
      overlay.classList.remove("hidden");
    document.querySelector("body").style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    if (!modal.classList.contains("hidden")) modal.classList.add("hidden");
    if (!overlay.classList.contains("hidden")) overlay.classList.add("hidden");
    document.querySelector("body").style.overflow = "";
  };

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

  /* ACCORDIANS */

  /* ACCORDION STRUCTURE DEFINITION */
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

  // GALLERY PAGE IMAGE SLIDER

  if (currentPage === "gallery") {
    // Slider 1
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

    // Slider 2

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
      slider();
      slider2();
    });
  }
}
