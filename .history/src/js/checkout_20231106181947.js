import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();



document.addEventListener("DOMContentLoaded", function () {
    // Select the form element
    const checkoutForm = document.forms["checkout"];
  
   
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault(); 
  
     
      const isValid = true; 
      if (isValid) {
      
        window.location.href = "success.html";
      }
    });
  });
  