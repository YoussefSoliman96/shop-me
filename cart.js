document.addEventListener("DOMContentLoaded", function () {
  function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Clear existing items

    // Create a set to keep track of items already displayed
    const displayedItems = new Set();

    // Iterate over the cart items and display them
    cartItems.forEach((item) => {
      const itemId = item.id;
      // Check if this item is already displayed
      if (!displayedItems.has(itemId)) {
        // Item is not displayed, create a new card
        const card = createProductCard(item);
        cartContainer.appendChild(card);
        displayedItems.add(itemId); // Add item to set of displayed items
      }
    });

    // Calculate and display total price
    const totalPrice = calculateTotalPrice(cartItems);
    displayTotalPrice(totalPrice);
  }

  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = product.id;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    card.appendChild(img);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.textContent = product.title;
    cardInfo.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = `$${product.price}`;
    cardInfo.appendChild(itemPrice);

    const quantityElement = document.createElement("div");
    quantityElement.classList.add("quantity-area");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () =>
      adjustQuantity(product.id, -1)
    );
    quantityElement.appendChild(decreaseButton);

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = product.quantity || 1; // Display quantity
    quantityElement.appendChild(quantityDisplay);

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () =>
      adjustQuantity(product.id, 1)
    );
    quantityElement.appendChild(increaseButton);

    cardInfo.appendChild(quantityElement);
    card.appendChild(cardInfo);

    return card;
  }

  function adjustQuantity(productId, change) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the index of the item with the specified ID in the cart
    const itemIndex = cartItems.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      // Update the quantity of the item at the specified index
      cartItems[itemIndex].quantity =
        (cartItems[itemIndex].quantity || 1) + change;

      // Remove the item from the cart if the quantity is 0 or less
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }

      // Update the cart in local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Refresh the cart display
      displayCartItems();
    }
  }

  function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0; // Default to 0 if price is not defined
      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is not defined
      return total + itemPrice * itemQuantity;
    }, 0);
  }

  function displayTotalPrice(totalPrice) {
    const totalPriceDisplay = document.getElementById("total-price");
    totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Calculate and display total price when the page loads
  displayCartItems();
});
