class NavView {
  #parentElement = document.querySelector(".header");
  #mobileNav;
  #mobileMenuBtn;
  #mobileMenuBtnIcon;
  #hero;
  #pageHero;
  #headerHeight;

  constructor() {
    this.#mobileNav = document.querySelector(".header__mobile-nav");
    this.#mobileMenuBtn = document.querySelector(".header__menu-btn");
    this.#mobileMenuBtnIcon = document.querySelector(".header__menu-btn i");
    this.#hero = document.querySelector(".hero");
    this.#pageHero = document.querySelector(".page__hero");
    this.#headerHeight = this.#parentElement.getBoundingClientRect().height;
  }

  _openMobileNav() {
    this.#mobileNav.classList.replace(
      "header__mobile-nav",
      "header__mobile-nav--open"
    );
  }

  _closeMobileNav() {
    this.#mobileNav.classList.replace(
      "header__mobile-nav--open",
      "header__mobile-nav"
    );
  }

  _toggleMobileNav() {
    const isOpen = this.#mobileNav.classList.contains(
      "header__mobile-nav--open"
    );

    isOpen ? this._closeMobileNav() : this._openMobileNav();
  }

  _toggleMenuBtnIcon() {
    const isOpen = this.#mobileNav.classList.contains(
      "header__mobile-nav--open"
    );
    this.#mobileMenuBtnIcon.classList = isOpen
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  }

  handleToggleMobileNav(handler) {
    this.#mobileMenuBtn.addEventListener("click", handler);
  }

  initStickyNav() {
    const stickyNav = (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        this.#parentElement.classList.add("header--sticky");
      } else {
        this.#parentElement.classList.remove("header--sticky");
      }
    };

    const navObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${this.#headerHeight}px`,
    });

    if (this.#hero) navObserver.observe(this.#hero);
    if (this.#pageHero) navObserver.observe(this.#pageHero);
  }
}

export default new NavView();
