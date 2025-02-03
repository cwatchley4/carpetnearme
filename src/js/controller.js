"use strict";

import navView from "./views/navView";
import accordionView from "./views/accordionView";
import modalView from "./views/modalView";
import swiperView from "./views/swiperView";
import vendors from "./utilities/vendors";

const controlToggleMobileNav = function () {
  navView._toggleMobileNav();
  navView._toggleMenuBtnIcon();
};

const controlToggleAccordions = function () {
  accordionView.handleToggleAccordions();
};

const controlOpenModal = function (modal) {
  modalView._openModal(modal);
};

const controlCloseModal = function (modal) {
  modalView._closeModal(modal);
};

const init = function () {
  vendors.initFacebookPixel();
  accordionView.handleToggleAccordions(controlToggleAccordions);
  navView.initStickyNav();
  navView.handleToggleMobileNav(controlToggleMobileNav);
  swiperView.initHeroBackgroundSwiper();
  swiperView.initGallerySwiper();
  modalView.handleOpenModal(controlOpenModal);
  modalView.handleCloseModal(controlCloseModal);
  modalView.handleOverlayClick(controlCloseModal);
};

init();
