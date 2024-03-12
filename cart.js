document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
});

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
  increaseButton.addEventListener("click", () => adjustQuantity(product.id, 1));
  quantityElement.appendChild(increaseButton);

  cardInfo.appendChild(quantityElement);
  card.appendChild(cardInfo);

  return card;
}

function adjustQuantity(productId, change) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCartItems = cartItems.map((item) => {
    if (item.id === productId) {
      item.quantity = (item.quantity || 1) + change; // Adjust quantity
    }
    return item;
  });

  // Remove items with quantity <= 0
  const filteredCartItems = updatedCartItems.filter(
    (item) => item.quantity > 0
  );

  localStorage.setItem("cart", JSON.stringify(filteredCartItems));
  displayCartItems(); // Update UI
}
