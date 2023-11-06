import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <img src="delete-icon.png" alt="Delete Item" class="delete-icon" data-index="${index}">
</li>`;

  return newItem;
}


renderCartContents();

