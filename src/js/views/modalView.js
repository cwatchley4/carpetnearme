class ModalView {
  #overlay = document.querySelector(".overlay");
  #modal = document.querySelectorAll(".services__modal");
  #openModalBtn = document.querySelectorAll(".btn--modal");
  #closeModalBtn = document.querySelectorAll(".services__modal-icon");

  _openModal(modal) {
    if (modal.classList.contains("hidden")) modal.classList.remove("hidden");
    this.#overlay.style.opacity = 100;
    this.#overlay.style.zIndex = 2;
    document.querySelector("body").style.overflow = "hidden";
  }

  _closeModal(modal) {
    if (!modal.classList.contains("hidden")) modal.classList.add("hidden");
    this.#overlay.style.opacity = 0;
    this.#overlay.style.zIndex = -1;
    document.querySelector("body").style.overflow = "";
  }

  handleOpenModal(handler) {
    if (!this.#modal) return;
    this.#openModalBtn.forEach((openModalBtn, i) => {
      openModalBtn.addEventListener("click", () => handler(this.#modal[i]));
    });
  }

  handleCloseModal(handler) {
    if (this.#modal.length === 0) return;
    this.#closeModalBtn.forEach((closeModalBtn, i) => {
      closeModalBtn.addEventListener("click", () => handler(this.#modal[i]));
    });
  }

  handleOverlayClick(handler) {
    if (this.#modal.length === 0) return;
    this.#overlay.addEventListener("click", () => {
      this.#modal.forEach((modal) => handler(modal));
    });
  }
}

export default new ModalView();
