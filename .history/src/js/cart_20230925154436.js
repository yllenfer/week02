import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function addToCart(item) {
  // Retrieve the current cart contents from local storage
  const cartItems = getLocalStorage("so-cart") || [];

  // Check if the item is already in the cart
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    // If the item is already in the cart, increment its quantity
    existingItem.quantity++;
  } else {
    // If it's a new item, add it to the cart
    cartItems.push({ ...item, quantity: 1 });
  }

  // Update the cart contents in local storage
  setLocalStorage("so-cart", cartItems);

  // Render the updated cart contents
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Create the HTML template for a cart item
  // Include the item quantity in the template
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
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Example usage to add an item to the cart
const newItemToAdd = {
  id: 123, // Replace with the actual item ID
  Name: "Item Name", // Replace with the item's name
  // ... Include other item properties
};

addToCart(newItemToAdd);

// Render the initial cart contents
renderCartContents();
