import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Add this script in your checkout.js file

document.addEventListener("DOMContentLoaded", function () {
    // Select the form element
    const checkoutForm = document.forms["checkout"];
  
    // Add a submit event listener to the form
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // You can add your form validation logic here.
      // For example, check if all required fields are filled correctly.
      // If validation fails, you can display an error message and prevent navigation.
  
      // If the form is valid and should navigate to success.html:
      const isValid = true; // Replace with your actual validation logic
      if (isValid) {
        // Navigate to success.html
        window.location.href = "success.html";
      }
    });
  });
  