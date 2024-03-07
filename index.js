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
  buttonsDiv.appendChild(addToCartButton);

  const buyNowButton = document.createElement("button");
  buyNowButton.classList.add("buy-now");
  buyNowButton.textContent = "Buy Now";
  buttonsDiv.appendChild(buyNowButton);

  cardInfo.appendChild(buttonsDiv);
  card.appendChild(cardInfo);

  return card;
}
