import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// Initialize the cart with an empty array if it doesn't exist in local storage
const initialCart = getLocalStorage("so-cart") || [];

function addProductToCart(product) {
  // Clone the existing cart to avoid modifying it directly
  const cartItems = [...initialCart];

  // Check if the product is already in the cart
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // If the product is already in the cart, increment its quantity
    existingItem.quantity++;
  } else {
    // If it's a new product, add it to the cart with a quantity of 1
    cartItems.push({ ...product, quantity: 1 });
  }

  // Update the cart contents in local storage
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
