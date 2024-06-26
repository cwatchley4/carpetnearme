"use strict";

const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {
  const colorSelectors = card.querySelectorAll(".colors img");
  const cardImage = card.querySelector(".card-img");
  const cardNumber = colorSelectors[0].getAttribute("data-card"); // Get the card number
  const colorName = document.getElementById(`color-name-${cardNumber}`); // Use the card number to select the unique ID

  colorSelectors.forEach(function (colorSelector) {
    colorSelector.addEventListener("click", function () {
      // Remove the ".selected" class from all color selectors within this card
      colorSelectors.forEach(function (selector) {
        selector.classList.remove("selected");
      });

      // Add the ".selected" class to the clicked color selector
      colorSelector.classList.add("selected");

      // Get the src of the selected color and update the card image
      const selectedColorSrc = colorSelector.src;
      cardImage.src = selectedColorSrc;

      // Update the text in the unique .color-name with the color name
      const colorNameText = colorSelector.getAttribute("alt");
      colorName.textContent = colorNameText;

      console.log("clicked");
    });
  });
});

// FILTERS

const checkboxes = document.querySelectorAll(".filter");

// Add an event listener to each checkbox
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    const categoryName = checkbox.getAttribute("name");

    // Check the state of the checkbox
    if (checkbox.checked) {
      // Show products that match the category
      cards.forEach(function (card) {
        if (card.id === categoryName) {
          card.style.display = "flex";
        }
      });
    } else {
      // Hide products that match the category
      cards.forEach(function (card) {
        if (card.id === categoryName) {
          card.style.display = "none";
        }
      });
    }
  });
});
