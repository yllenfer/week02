import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Add this script in your checkout.js file

document.addEventListener("DOMContentLoaded", function () {
    // Select the form element
    const checkoutForm = document.forms["checkout"];
  
    // Add a submit event listener to the form
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
     
      const isValid = true; 
      if (isValid) {
        // Navigate to success.html
        window.location.href = "success.html";
      }
    });
  });
  