import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
export default function* generatorFunctionName() {
  /* … */
}

const productId = getParam("product");
productDetails(productId);

function productList() {}
