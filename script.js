"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded fired, initializing script.js");

  const currentPage = document.documentElement.getAttribute("data-page");

  /* DROPDOWN MENU NAV */
  const toggleBtn = document.querySelector(".toggle-btn");
  const toggleBtnIcon = document.querySelector(".toggle-btn i");
  const mobileNav = document.querySelector(".mobile-nav");
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

  /* INTERSECTION OBSERVER (Sticky Header) */
  const hero = document.querySelector(".hero");
  const pageHero = document.querySelector(".page-hero");
  const headerHeight = mainHeader.getBoundingClientRect().height;

  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
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

  /* HOME PAGE BACKGROUND SLIDER */
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

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  const preloadAllImages = (imageArray) => {
    return Promise.all(imageArray.map((src) => preloadImage(src)));
  };

  const keepImagesInMemory = (imageArray) => {
    imageArray.forEach((src) => {
      const div = document.createElement("div");
      div.style.backgroundImage = `url(${src})`;
      div.style.display = "none";
      document.body.appendChild(div);
    });
  };

  function changeBackground() {
    hero.style.backgroundImage = `url(${photos[currentPhoto]})`;
    currentPhoto = (currentPhoto + 1) % photos.length;
  }

  preloadAllImages(photos)
    .then(() => {
      keepImagesInMemory(photos);
      setInterval(changeBackground, 5000);
      changeBackground();
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

  servicesModalBtn.forEach((learnMoreBtn, index) => {
    learnMoreBtn.addEventListener("click", function () {
      openModal(servicesModal[index]);
    });
  });

  servicesCloseModalBtn.forEach((closeBtn, index) => {
    closeBtn.addEventListener("click", function () {
      closeModal(servicesModal[index]);
    });
  });

  overlay.addEventListener("click", function () {
    servicesModal.forEach((modal) => closeModal(modal));
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      servicesModal.forEach((modal) => closeModal(modal));
    }
  });

  /* ACCORDIONS */
  if (currentPage === "home") {
    const accordions = [
      { id: "consultation", accordion: null, button: null, text: null },
      { id: "estimates", accordion: null, button: null, text: null },
      { id: "installation", accordion: null, button: null, text: null },
      { id: "follow-up", accordion: null, button: null, text: null },
    ];

    accordions.forEach((acc) => {
      acc.accordion = document.querySelector(`#${acc.id}`);
      acc.button = document.querySelector(`#${acc.id} i`);
      acc.text = document.querySelector(`#${acc.id} p`);
    });

    const toggleBtnArrow = (text, btn) => {
      const isClosed = text.classList.contains("hidden");
      btn.className = isClosed
        ? "fa-solid fa-chevron-down"
        : "fa-solid fa-chevron-up";
    };

    const toggleAccordion = (current) => {
      current.text.classList.toggle("hidden");
      accordions.forEach((acc) => {
        if (acc.id !== current.id) {
          acc.text.classList.add("hidden");
        }
      });
      toggleBtnArrow(current.text, current.button);
    };

    accordions.forEach((acc) => {
      acc.button.addEventListener("click", () => {
        toggleAccordion(acc);
        accordions.forEach((otherAcc) =>
          toggleBtnArrow(otherAcc.text, otherAcc.button)
        );
      });
    });
  }

  /* GALLERY PAGE IMAGE SLIDER */
  if (currentPage === "carpet" || currentPage === "vinyl") {
    const setupSlider = (
      imageListSelector,
      sliderBtnSelector,
      scrollBarSelector,
      thumbSelector
    ) => {
      const imageList = document.querySelector(imageListSelector);
      const sliderButtons = document.querySelectorAll(sliderBtnSelector);
      const sliderScrollBar = document.querySelector(scrollBarSelector);
      const scrollBarThumb = document.querySelector(thumbSelector);
      const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

      scrollBarThumb.addEventListener("mousedown", function (e) {
        const startX = e.clientX;
        const thumbPosition = scrollBarThumb.offsetLeft;

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

        const handleMouseUp = function () {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });

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

    if (currentPage === "carpet") {
      setupSlider(
        ".image-list",
        ".slider-btn",
        ".slider-scrollbar",
        ".scrollbar-thumb"
      );
    }

    if (currentPage === "vinyl") {
      setupSlider(
        ".image-list2",
        ".slider-btn2",
        ".slider-scrollbar2",
        ".scrollbar-thumb2"
      );
    }
  }

  /* HIBU PHONE NUMBER REPLACEMENT */
  (function () {
    const ybFindPhNums = ["17797775635"];
    const ybReplacePhNums = ["17792610254"];

    function normalizePhoneNumber(phoneNumber) {
      // Remove anything that is not a digit (e.g., spaces, dashes, parentheses)
      return phoneNumber.replace(/\D/g, "");
    }

    function removeCountryCode(phoneNumber) {
      // Remove leading '1' for US country code, if present
      return phoneNumber.startsWith("1") ? phoneNumber.slice(1) : phoneNumber;
    }

    function ybFun_ReplaceText() {
      const phoneElements = document.querySelectorAll("a[href^='tel:']");
      console.log(`Found ${phoneElements.length} phone number links`);

      phoneElements.forEach((element) => {
        const originalHref = element.href;
        const originalText = element.textContent.trim(); // Trim whitespace

        // Normalize both the href and visible text for comparison
        const normalizedHref = normalizePhoneNumber(originalHref);
        const normalizedText = normalizePhoneNumber(originalText);

        console.log(`Original href: ${originalHref}`);
        console.log(`Normalized href: ${normalizedHref}`);
        console.log(`Original text: ${originalText}`);
        console.log(`Normalized text: ${normalizedText}`);

        ybFindPhNums.forEach((num, index) => {
          const normalizedFindNum = normalizePhoneNumber(num);
          const normalizedFindNumNoCountry =
            removeCountryCode(normalizedFindNum);

          // Replace in href if found (with or without country code)
          if (
            normalizedHref.includes(normalizedFindNum) ||
            normalizedHref.includes(normalizedFindNumNoCountry)
          ) {
            console.log(
              `Replacing phone number in href: ${originalHref} -> ${ybReplacePhNums[index]}`
            );
            element.href = element.href.replace(
              normalizedFindNum,
              ybReplacePhNums[index]
            );
            element.href = element.href.replace(
              normalizedFindNumNoCountry,
              ybReplacePhNums[index]
            );
          } else {
            console.log(
              `No match found in href: ${normalizedHref} for number ${normalizedFindNum} or ${normalizedFindNumNoCountry}`
            );
          }

          // Replace in textContent if found (with or without country code)
          if (
            normalizedText.includes(normalizedFindNum) ||
            normalizedText.includes(normalizedFindNumNoCountry)
          ) {
            console.log(
              `Replacing phone number in text: ${originalText} -> ${ybReplacePhNums[index]}`
            );
            element.textContent = originalText.replace(
              normalizedFindNum,
              ybReplacePhNums[index]
            );
            element.textContent = originalText.replace(
              normalizedFindNumNoCountry,
              ybReplacePhNums[index]
            );
          } else {
            console.log(
              `No match found in text: ${normalizedText} for number ${normalizedFindNum} or ${normalizedFindNumNoCountry}`
            );
          }
        });
      });
    }

    // Run the phone number replacement after page load
    setTimeout(() => {
      console.log("Running phone number replacement");
      ybFun_ReplaceText();
    }, 500);

    // Listen for a custom event in case numbers are changed dynamically
    document.addEventListener("YextPhoneChangeEvent", function () {
      console.log("YextPhoneChangeEvent triggered, replacing phone numbers");
      ybFun_ReplaceText();
    });

    if (typeof dmAPI !== "undefined") {
      dmAPI.runOnReady("dpni", function () {
        setTimeout(ybFun_ReplaceText, 500);
      });
      dmAPI.subscribeEvent(dmAPI.EVENTS.SHOW_POPUP, function (data) {
        setTimeout(ybFun_ReplaceText, 500);
        console.log("dmAPI.EVENTS.SHOW_POPUP: " + data);
      });
    }
  })();
});
