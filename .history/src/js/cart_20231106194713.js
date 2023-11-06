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

function cartItemTemplate(item, index) {
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
  <img src="/." alt="Delete Item" class="delete-icon" data-index="${index}">
</li>`;

  return newItem;
}


document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const index = e.target.getAttribute("data-index");
    const cartItems = getLocalStorage("so-cart");
    if (index >= 0 && index < cartItems.length) {
      const deletedItemPrice = cartItems[index].FinalPrice;
      cartItems.splice(index, 1);
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
      updateCartTotal(cartItems);
    }
  }
});


renderCartContents();

