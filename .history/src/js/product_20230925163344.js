import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // Read the current datas in the cart list
  let cart = getLocalStorage("so-cart");

  // If there is no data in the initial cart as an empty array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // add the new product in the cart list
  cart.push(product);

  // Update and save the complete list in the localStorage
  setLocalStorage("so-cart", cart);
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