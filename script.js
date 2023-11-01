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
  const estimatesModal = document.querySelector(".modal-estimates");
  const haulAwayModal = document.querySelector(".modal-haul");
  const furnitureModal = document.querySelector(".modal-furniture");
  const closeEstimatesModalBtn = document.querySelector(".modal-estimates i");
  const closeHaulModalBtn = document.querySelector(".modal-haul i");
  const closeFurnitureModalBtn = document.querySelector(".modal-furniture i");
  const estimatesLearnMoreBtn = document.querySelector("#estimates-btn");
  const haulLearnMoreBtn = document.querySelector("#haul-btn");
  const furnitureLearnMoveBtn = document.querySelector("#furniture-btn");
  const overlay = document.querySelector(".overlay");

  const openModal = function (modal) {
    if (modal.classList.contains("hidden")) modal.classList.remove("hidden");
    if (overlay.classList.contains("hidden"))
      overlay.classList.remove("hidden");
    document.querySelector("body").style.overflow = "hidden";
  };

  const closeModal = function (modal) {
    if (!modal.classList.contains("hidden")) modal.classList.add("hidden");
    if (!overlay.classList.contains("hidden")) overlay.classList.add("hidden");
    document.querySelector("body").style.overflow = "";
  };

  estimatesLearnMoreBtn.addEventListener("click", function () {
    openModal(estimatesModal);
  });

  haulLearnMoreBtn.addEventListener("click", function () {
    openModal(haulAwayModal);
  });

  furnitureLearnMoveBtn.addEventListener("click", function () {
    openModal(furnitureModal);
  });

  closeEstimatesModalBtn.addEventListener("click", function () {
    closeModal(estimatesModal);
  });

  closeHaulModalBtn.addEventListener("click", function () {
    closeModal(haulAwayModal);
  });

  closeFurnitureModalBtn.addEventListener("click", function () {
    closeModal(furnitureModal);
  });

  /* PARALLAX TRANSITION */

  // window.addEventListener("scroll", function () {
  //   const parallax = document.querySelector(".transition");
  //   const offset = window.scrollY;
  //   parallax.style.backgroundPositionY = -offset * 0.2 + "px";
  // });

  /* ACCORDIANS */

  const consultationAccordian = document.querySelector("#consultation");
  const consultationAccordianBtn = document.querySelector("#consultation i");
  const consultationAccordianText = document.querySelector("#consultation p");

  const estimatesAccordian = document.querySelector("#estimates");
  const estimatesAccordianBtn = document.querySelector("#estimates i");
  const estimatesAccordianText = document.querySelector("#estimates p");

  const installationAccordian = document.querySelector("#installation");
  const installationAccordianBtn = document.querySelector("#installation i");
  const installationAccordianText = document.querySelector("#installation p");

  const followUpAccordian = document.querySelector("#follow-up");
  const followUpAccordianBtn = document.querySelector("#follow-up i");
  const followUpAccordianText = document.querySelector("#follow-up p");

  const toggleBtnArrow = function (text, btn) {
    const isClosed = text.classList.contains("hidden");
    btn.classList = isClosed
      ? "fa-solid fa-chevron-down"
      : "fa-solid fa-chevron-up";
  };

  const toggleConsultationAccordion = function () {
    consultationAccordian.style.height = "auto";
    consultationAccordianText.classList.toggle("hidden");
    estimatesAccordianText.classList.add("hidden");
    installationAccordianText.classList.add("hidden");
    followUpAccordianText.classList.add("hidden");
    toggleBtnArrow(consultationAccordianText, consultationAccordianBtn);
  };

  const toggleEstimatesAccordion = function () {
    estimatesAccordian.style.height = "auto";
    estimatesAccordianText.classList.toggle("hidden");
    consultationAccordianText.classList.add("hidden");
    installationAccordianText.classList.add("hidden");
    followUpAccordianText.classList.add("hidden");
    toggleBtnArrow(estimatesAccordianText, estimatesAccordianBtn);
  };

  const toggleInstallationAccordion = function () {
    installationAccordian.style.height = "auto";
    installationAccordianText.classList.toggle("hidden");
    estimatesAccordianText.classList.add("hidden");
    consultationAccordianText.classList.add("hidden");
    followUpAccordianText.classList.add("hidden");
    toggleBtnArrow(installationAccordianText, installationAccordianBtn);
  };

  const togglefollowUpFollowUpAccordion = function () {
    followUpAccordian.style.height = "auto";
    followUpAccordianText.classList.toggle("hidden");
    estimatesAccordianText.classList.add("hidden");
    installationAccordianText.classList.add("hidden");
    consultationAccordianText.classList.add("hidden");
    toggleBtnArrow(followUpAccordianText, followUpAccordianBtn);
  };

  consultationAccordianBtn.addEventListener("click", function () {
    toggleConsultationAccordion();
    toggleBtnArrow(consultationAccordianText, consultationAccordianBtn);
    toggleBtnArrow(estimatesAccordianText, estimatesAccordianBtn);
    toggleBtnArrow(installationAccordianText, installationAccordianBtn);
    toggleBtnArrow(followUpAccordianText, followUpAccordianBtn);
  });

  estimatesAccordianBtn.addEventListener("click", function () {
    toggleEstimatesAccordion();
    toggleBtnArrow(consultationAccordianText, consultationAccordianBtn);
    toggleBtnArrow(estimatesAccordianText, estimatesAccordianBtn);
    toggleBtnArrow(installationAccordianText, installationAccordianBtn);
    toggleBtnArrow(followUpAccordianText, followUpAccordianBtn);
  });

  installationAccordianBtn.addEventListener("click", function () {
    toggleInstallationAccordion();
    toggleBtnArrow(consultationAccordianText, consultationAccordianBtn);
    toggleBtnArrow(estimatesAccordianText, estimatesAccordianBtn);
    toggleBtnArrow(installationAccordianText, installationAccordianBtn);
    toggleBtnArrow(followUpAccordianText, followUpAccordianBtn);
  });

  followUpAccordianBtn.addEventListener("click", function () {
    togglefollowUpFollowUpAccordion();
    toggleBtnArrow(consultationAccordianText, consultationAccordianBtn);
    toggleBtnArrow(estimatesAccordianText, estimatesAccordianBtn);
    toggleBtnArrow(installationAccordianText, installationAccordianBtn);
    toggleBtnArrow(followUpAccordianText, followUpAccordianBtn);
  });
}

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
