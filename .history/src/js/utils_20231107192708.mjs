// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function updateCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
  const totalElement = document.getElementById("cart-total");
  totalElement.textContent = "$" + total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartTotal();
});

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}




export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}


// In your addToCartHandler function
export function showSuccessMessage() {
  const successMessage = document.createElement("div");
  successMessage.textContent = "Product added to the cart";
  successMessage.classList.add("success-message");

  // Add a class to the cart logo container to trigger the animation
  const cartLogoContainer = document.querySelector(".cart-logo-container");
  cartLogoContainer.classList.add("animate-cart");

  // Append the success message to the body
  document.body.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
    // Remove the animation class to reset the logo
    cartLogoContainer.classList.remove("animate-cart");
  }, 3000); // Display for 3 seconds (adjust duration as needed)
}




export async function loadHeaderFooter() {
  // header template will still be a function! But one where we have pre-supplied the argument.
  // headerTemplate and footerTemplate will be almost identical, but they will remember the path we passed in when we created them
  // why is it important that they stay functions?  The renderWithTemplate function is expecting a template function...if we sent it a string it would break, if we changed it to expect a string then it would become less flexible.
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p class="alert-message">${message}</p><span></span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}


document.addEventListener('DOMContentLoaded', function () {
  const checkoutForm = document.forms['checkout'];

  // Get all input elements
  const fnameInput = checkoutForm.elements['fname'];
  const lnameInput = checkoutForm.elements['lname'];
  const streetInput = checkoutForm.elements['street'];
  const cityInput = checkoutForm.elements['city'];
  const stateInput = checkoutForm.elements['state'];
  const zipInput = checkoutForm.elements['zip'];
  const cardNumberInput = checkoutForm.elements['cardNumber'];
  const expirationInput = checkoutForm.elements['expiration'];
  const codeInput = checkoutForm.elements['code'];

  // Add a submit event listener to the form
  checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validation functions
    function isValidName(value) {
      return /^[A-Za-z]+$/.test(value);
    }

    function isValidZip(value) {
      return /^\d{5}$/.test(value);
    }

    function isValidCardNumber(value) {
      return /^\d{16}$/.test(value) || /^(\d{4}-\d{4}-\d{4}-\d{4})$/.test(value);
    }

    function isValidExpiration(value) {
      return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
    }

    function isValidCode(value) {
      return /^\d{3}$/.test(value);
    }

    // Remove any previous alerts
    removeAllAlerts();

    // Validate First Name
    if (!isValidName(fnameInput.value)) {
      alertMessage('First Name cannot be empty or contain numbers.');
      return;
    }

    // Validate Last Name
    if (!isValidName(lnameInput.value)) {
      alertMessage('Last Name cannot be empty or contain numbers.');
      return;
    }

    // Validate Street
    if (streetInput.value.trim() === '') {
      alertMessage('Street cannot be empty.');
      return;
    }

    // Validate City
    if (cityInput.value.trim() === '') {
      alertMessage('City cannot be empty.');
      return;
    }

    // Validate State
    if (stateInput.value.trim() === '') {
      alertMessage('State cannot be empty.');
      return;
    }

    // Validate Zip Code
    if (!isValidZip(zipInput.value)) {
      alertMessage('Zip Code must be 5 digits.');
      return;
    }

    // Validate Card Number
    if (!isValidCardNumber(cardNumberInput.value)) {
      alertMessage('Invalid Card Number. It should be 16 digits or in format (1111-1111-1111-1111).');
      return;
    }

    // Validate Expiration Date
    if (!isValidExpiration(expirationInput.value)) {
      alertMessage('Invalid Expiration Date. It should be in format (MM/YY).');
      return;
    }

    // Validate Security Code
    if (!isValidCode(codeInput.value)) {
      alertMessage('Security Code must be 3 digits.');
      return;
    }

    // If all validations pass, you can proceed with form submission to success.html
    window.location.href = '/checkout/succe';
  });
});


export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}


