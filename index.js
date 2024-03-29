function togglemenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("desktop-nav");

var sticky = navbar.offsetTop;

function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      const productContainer = document.getElementById("product-container");
      products.forEach((product) => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      const productContainer = document.getElementById("product-container");
      const filterBtn = document.getElementById("filter-btn");
      const sortDropdown = document.getElementById("sort-dropdown");

      let filteredProducts = [...products];

      sortDropdown.addEventListener("change", () => {
        const sortOption = sortDropdown.value;
        if (sortOption === "az") {
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title)); // Sort A-Z
        } else if (sortOption === "za") {
          filteredProducts.sort((a, b) => b.title.localeCompare(a.title)); // Sort Z-A
        }
        displayProducts(filteredProducts);
      });

      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching products:", error));

  function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear existing products

    products.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
  }

  // Fetch categories and populate the dropdown
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      const categoryDropdown = document.getElementById("category-select");
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  // Event listener for selecting category
  document
    .getElementById("category-select")
    .addEventListener("change", function () {
      const selectedCategory = this.value;
      fetchAndDisplayProducts(selectedCategory);
    });

  // Function to fetch and display products
  function fetchAndDisplayProducts(category = "") {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url += `/category/${category}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((products) => {
        displayProducts(products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear existing products

    products.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
  }

  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

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

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", function () {
      addToCart(product);
    });
    buttonsDiv.appendChild(addToCartButton);

    const buyNowButton = document.createElement("button");
    buyNowButton.classList.add("buy-now");
    buyNowButton.textContent = "Buy Now";
    buttonsDiv.appendChild(buyNowButton);

    cardInfo.appendChild(buttonsDiv);
    card.appendChild(cardInfo);

    return card;
  }

  function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.productId;
      addToCart(productId);
    });
  });
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    const productContainer = document.getElementById("product-container");
    products.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    const productContainer = document.getElementById("product-container");
    const filterBtn = document.getElementById("filter-btn");
    const sortDropdown = document.getElementById("sort-dropdown");

    let filteredProducts = [...products];

    sortDropdown.addEventListener("change", () => {
      const sortOption = sortDropdown.value;
      if (sortOption === "az") {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title)); // Sort A-Z
      } else if (sortOption === "za") {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title)); // Sort Z-A
      }
      displayProducts(filteredProducts);
    });

    displayProducts(products);
  })
  .catch((error) => console.error("Error fetching products:", error));

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

// Fetch categories and populate the dropdown
fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((categories) => {
    const categoryDropdown = document.getElementById("category-select");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryDropdown.appendChild(option);
    });
  })
  .catch((error) => console.error("Error fetching categories:", error));

// Event listener for selecting category
document
  .getElementById("category-select")
  .addEventListener("change", function () {
    const selectedCategory = this.value;
    fetchAndDisplayProducts(selectedCategory);
  });

// Function to fetch and display products
function fetchAndDisplayProducts(category = "") {
  let url = "https://fakestoreapi.com/products";
  if (category) {
    url += `/category/${category}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((products) => {
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

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

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.addEventListener("click", function () {
    addToCart(product);
  });
  buttonsDiv.appendChild(addToCartButton);

  const buyNowButton = document.createElement("button");
  buyNowButton.classList.add("buy-now");
  buyNowButton.textContent = "Buy Now";
  buttonsDiv.appendChild(buyNowButton);

  cardInfo.appendChild(buttonsDiv);
  card.appendChild(cardInfo);

  return card;
}

function addToCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === productId
  );

  if (existingItemIndex !== -1) {
    // Item already exists in cart, increment quantity by 1
    cartItems[existingItemIndex].quantity =
      (cartItems[existingItemIndex].quantity || 1) + 1;
  } else {
    // Item does not exist in cart, add it with quantity 1
    cartItems.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}
