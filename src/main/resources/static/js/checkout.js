
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}

document.addEventListener("DOMContentLoaded", () => {
    let userId = document.getElementById("userid").value;
    console.log("User ID:", userId);

    // Gọi API để lấy sản phẩm trong giỏ hàng
    fetch(`/Cart/items/${userId}`)
        .then(response => response.json())
        .then(cartItems => {
            console.log(cartItems); // Log the response to check if items are being returned
            // Process and display cart items here
            const cartContainer = document.getElementById("cartItems");
            let total = 0;
            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                const productRow = `
        <tr>
          <td>
            <button onclick="removeFromCart(${item.id})"><i class="fa-regular fa-circle-xmark"></i></button>
          </td>
          <td><img src="${item.productImageUrl}" alt="${item.productName}" /></td>
          <td>${item.productName}</td>
          <td id="itemprice_${item.id}">${formatCurrency(item.price)}</td>
          <td><input type="number" id="quantity_${item.id}" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" /></td>
          <td id="itemtotal_${item.id}">${formatCurrency(itemTotal)}</td>
        </tr>
      `;
                cartContainer.insertAdjacentHTML("beforeend", productRow);
            });
            document.getElementById("cartTotal").innerHTML = formatCurrency(total);
            document.getElementById("cartGrandTotal").innerHTML = formatCurrency(total);
        })
        .catch(error => console.error("Error fetching cart data:", error));
});


// Các hàm hỗ trợ
  function removeFromCart(productId) {
      const cartItem = {
          id: productId,
      }
      fetch('/cart/remove', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
      })
          .then(data => {
              alert('Xóa sản phẩm thành công!!');
              console.log(`Removing product with ID: ${productId}`);
              location.reload();
          })
          .catch(error => console.error('Có lỗi khi xóa hàng:', error));
}

function updateQuantity(productId, newQuantity) {
    const cartItem = {
        id: productId,
        quantity: newQuantity,
    };
    fetch('/cart/updateQuantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
    })
        .then(data => {
            console.log(`Updated product ID ${productId} to quantity ${newQuantity}`);
            // Update the quantity input field
            document.getElementById(`quantity_${productId}`).value = newQuantity;
            const itemPrice = parseFloat(document.getElementById(`itemprice_${productId}`).textContent.replace("đ", "").replace(/\./g, "")); // Lấy giá sản phẩm từ HTML và loại bỏ dấu "đ"
            const itemTotal = itemPrice * newQuantity;
            document.getElementById(`itemtotal_${productId}`).innerHTML = formatCurrency(itemTotal);
                updateCartTotal();
            })
}
function updateCartTotal() {
    let userId = document.getElementById("userid").value;
    console.log("User ID:", userId);
    // Re-fetch the cart items to get the updated total
    fetch(`/Cart/items/${userId}`)
        .then(response => response.json())
        .then(cartItems => {
            let total = 0;
            let grandTotal = 0;
            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                grandTotal = total - coupon
            });
            // Update the total displayed on the page
            document.getElementById("cartTotal").innerHTML = formatCurrency(total);
            document.getElementById("cartGrandTotal").innerHTML = formatCurrency(grandTotal);
        })
        .catch(error => console.error("Error fetching updated cart data:", error));
}
let couponApplied = false; // Flag to check if coupon is already applied
let coupon = 0; // Initial coupon value

function AddCoupon() {
    while (!couponApplied) { // Loop until a valid coupon is entered or applied successfully
        const couponInput = document.getElementById("coupontext").value.trim();

        if (couponInput === "ANHLAMDEPTRAI") {
            coupon = 1000000; // Set the discount value
            document.getElementById("cartCoupon").innerHTML = formatCurrency(coupon); // Display formatted coupon value
            couponApplied = true; // Set the flag to true to avoid further prompts
            updateCartTotal(); // Recalculate totals with the coupon applied
            alert("Coupon applied successfully!");
            break; // Exit the loop
        } else {
            alert("Invalid coupon code. Please try again."); // Show error message
            document.getElementById("coupontext").value = ""; // Clear the input for re-entry
            return; // Exit the function and allow the user to retry manually
        }
    }
}
document.querySelector('.header_account_icon').addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    // Toggle display of the dropdown menu
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});
