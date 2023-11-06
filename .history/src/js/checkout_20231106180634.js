import { loadHeaderFooter } from "./utils.mjs";
import { updateCartTotal } from '../js/cart.js';



loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function () {
    updateCartTotal();
  });
  
