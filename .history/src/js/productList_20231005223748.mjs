export default function productList(selector, category) {
    
    // get the element we will insert the list into from the selector
    const products = document.getElementsByClassName("products");
    Array.from(products).forEach(product => {
        console.log(product);
    });
    // get the list of products 
    // render out the product list to the element
    
}
