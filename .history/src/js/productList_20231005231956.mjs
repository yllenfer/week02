import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// productList.mjs
function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
  }

  function filterProducts(productList) {
   
    const neededProductIds = ["880RR", "985RF", "989CG", "985PR"];
    const filteredProducts = productList.filter(product => neededProductIds.includes(product.Id));
  
    return filteredProducts;
  }
  
  // Sample product data
  const products = [
    // ... (Your product data here)
  ];
  
  // Call the filterProducts function to get the filtered list
  const filteredTents = filterProducts(products);
  
  // Now you can use the filteredTents array to display the 4 tents you need
  


export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    // get the list of products
    const products = await getData(category);
    console.log(products);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, el, products);
  }