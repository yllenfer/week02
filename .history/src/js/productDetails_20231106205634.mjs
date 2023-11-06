import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { showSuccessMessage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  //TODO: I changed here
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}



function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

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
    showSuccessMessage();
  }



  
  // add listener to Add to Cart button
  // async function addToCartHandler(e) {
  //   const product = await findProductById(e.target.dataset.id);
  //   addProductToCart(product);
  //   showSuccessMessage();
  // }

