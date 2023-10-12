import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
expo;

const productId = getParam("product");
productDetails(productId);

function productList() {}
