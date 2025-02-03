import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/swiper.scss";
import "swiper/modules/autoplay.scss";
import "swiper/modules/pagination.scss";
import "swiper/modules/navigation.scss";

class swiperView {
  swiperContainerHero = document.querySelector(".swiper-container--hero");
  swiperContainerGallery = document.querySelectorAll(
    ".swiper-container--gallery"
  );

  constructor() {
    console.log(`Hero Swiper: ${this.swiperContainerHero}`);
    console.log(`Gallery Swiper: ${this.swiperContainerGallery}`);
  }

  initHeroBackgroundSwiper() {
    if (!this.swiperContainerHero) {
      console.log("Swiper: Hero not present.");
      return;
    }
    const swiper = new Swiper(this.swiperContainerHero, {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  initGallerySwiper() {
    if (!this.swiperContainerGallery) {
      console.log("Swiper: Gallery not present");
      return;
    }

    this.swiperContainerGallery.forEach((swiper) => {
      new Swiper(swiper, {
        modules: [Pagination, Navigation],
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          630: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          820: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1050: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
  }
}

export default new swiperView();
