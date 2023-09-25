import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  if (existingItem){
    existingItem.quantity++;
  }else {
    cartItems.push({...item, quantity: 1});
    }
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
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
</li>`;

  return newItem;
}


const newItemToAdd = {
  id: 123, // Replace with the actual item ID
  Name: "Item Name", // Replace with the item's name
  // ... Include other item properties
};

addToCart(newItemToAdd);

// Render the initial cart contents
renderCartContents();