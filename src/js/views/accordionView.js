class AccordionView {
  #accordions = [
    { id: "consultation", accordion: null, icon: null, text: null },
    { id: "estimates", accordion: null, icon: null, text: null },
    { id: "installation", accordion: null, icon: null, text: null },
    { id: "follow-up", accordion: null, icon: null, text: null },
  ];

  constructor() {
    this.#accordions.forEach((acc) => {
      acc.accordion = document.querySelector(`#${acc.id}`);
      acc.icon = document.querySelector(`#${acc.id} i`);
      acc.text = document.querySelector(`#${acc.id} p`);
    });
  }

  toggleAccordion(current) {
    current.text.classList.toggle("hidden");
    this.#accordions.forEach((acc) => {
      if (acc.id !== current.id) {
        acc.text.classList.add("hidden");
      }
    });
    this.toggleBtnArrow(current.text, current.icon);
  }

  toggleBtnArrow(text, btn) {
    const isClosed = text.classList.contains("hidden");
    btn.className = isClosed
      ? "fa-solid fa-chevron-down"
      : "fa-solid fa-chevron-up";
  }

  handleToggleAccordions() {
    if (this.#accordions[0].accordion) {
      this.#accordions.forEach((acc) => {
        acc.accordion.addEventListener("click", () => {
          this.toggleAccordion(acc);
          this.#accordions.forEach((otherAcc) =>
            this.toggleBtnArrow(otherAcc.text, otherAcc.icon)
          );
        });
      });
    }
  }
}

export default new AccordionView();
