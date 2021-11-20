$(document).ready(function () {
  const cartTable = $("#cartTable");
  const productInfo = $("#productInfo");
  const promoCodeInput = $("#promoCodeInput");
  const promoCodeBtn = $("#promoCodeBtn");
  const shipping = $("#shipping"); // select the SELECT menu
  const shippingAmt = $("#shippingAmt"); //selects the table data for displaying shipping cost
  const discountRow = $("#discountRow");
  const subtotalAmt = $("#subtotalAmt");
  const taxAmt = $("#taxAmt");
  const totalAmt = $("#totalAmt");
  let shippingArray = [];
  let product = {};
  let qtyTotal = 0;
  let discount = 0;
  let shippingCost = 7.0;
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  async function getProducts() {
    const productUri =
      "https://webspace.csumb.edu/~lara4594/ajax/promo/products.php";
    const response = await fetch(productUri);
    let data = await response.json();
    product = data[Math.floor(Math.random() * 4)];
    console.log(product);
    addProductToCart(product);
  }

  function addProductToCart(product) {
    qtyTotal = parseFloat(product.price * product.qty).toFixed(2);
    let prodHTML = `<td>${product.productName}</td><td>${product.price}</td><td><input class='qtyInput' type='text' value='${product.qty}' /></td><td class='qtyTotal'>$${qtyTotal}</td>`;
    productInfo.append(prodHTML);
    updateTotal();
  }
  // Update QTY and Qty total
  cartTable.on("change", "input", function () {
    let qtyInput = $(this).closest("tr input");
    let qty = qtyInput.val();
    product.qty = qty;
    productInfo.empty();
    addProductToCart(product);
    updateTotal();
  });

  // Handle promo input submit
  promoCodeBtn.click(async function () {
    const promoURI =
      "https://webspace.csumb.edu/~lara4594/ajax/promo/promoCode.php?promoCode=";
    const promoInput = promoCodeInput.val();
    console.log(promoInput);
    let response = await fetch(promoURI + promoInput);
    let data = await response.json();

    if (!data) {
      $("#promoErrorResponse").html("Promo code does not exist!");
    } else {
      discountRow.empty();
      discount = qtyTotal * (parseInt(data.discount) / 100);
      let discountHTML = `<td>Discount</td><td></td><td>${data.discount}%</td><td>$-${discount}</td>`;
      discountRow.append(discountHTML);
      updateTotal();
    }
  });
  // populate shipping menu from API:
  async function getShippingCosts() {
    let shippingURI =
      "https://webspace.csumb.edu/~lara4594/ajax/promo/shippingMethods.php";
    try {
      let result = await fetch(shippingURI);
      shippingArray = await result.json();
      shippingArray.forEach((method) => {
        shipping.append(
          `<option value=${method.price}>${method.shippingMethod} - $${method.price}.00</option>`
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  // Get shipping cost
  shipping.on("change", function () {
    shippingCost = $("select option:selected").val();
    shippingAmt.html("$" + parseFloat(shippingCost).toFixed(2));
    updateTotal();
  });

  function updateTotal() {
    subtotal =
      parseFloat(qtyTotal) + parseFloat(shippingCost) - parseFloat(discount);
    tax = 0.1 * subtotal;
    total = subtotal + tax;

    subtotalAmt.html(subtotal.toFixed(2));
    taxAmt.html(tax.toFixed(2));
    totalAmt.html(total.toFixed(2));
  }
  getProducts();
  getShippingCosts();
});
