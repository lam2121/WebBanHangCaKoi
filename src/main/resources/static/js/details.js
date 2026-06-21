
function AddToCart() {
    let userId = document.getElementById("userid").value;
    console.log("User ID:", userId);

  // Lấy thông tin sản phẩm từ trang
  const productId = new URLSearchParams(window.location.search).get("id");
  const quantityInput = document.querySelector('input[type="number"]');
  const quantity = parseInt(quantityInput.value);
  const productName = document.getElementById('productName').textContent;
  const productImage = document.getElementById('productImage').src;
  const productOrigin = document.getElementById('productOrigin').textContent;
  const productPrice =  parseFloat(document.getElementById('productPrice').textContent.replace("đ", "").replace(/\./g, "")); // Lấy giá sản phẩm từ HTML và loại bỏ dấu "đ"

  // Tạo đối tượng cartItem để gửi lên server
  const cartItem = {
    productId: productId,
    quantity: quantity,
    price: productPrice,
    productName: productName,
    productImageUrl: productImage,
      origin: productOrigin,
  };

  // Gửi yêu cầu POST đến server để thêm sản phẩm vào giỏ hàng
  fetch(`/Cart/add/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem),
  })
      .then(response => {
        if (response.status === 401||response.status === 400||response.status === 403) {
          alert("Vui lòng đăng nhập để thêm sản phẩm");
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          alert('Thêm sản phẩm thành công!');
          console.log('Cart item added:', data);
        }
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
}
// Đặt mua
function BookFish() {
    const productId = new URLSearchParams(window.location.search).get("id");
    const quantityInput = document.querySelector('input[type="number"]');
    const quantity = parseInt(quantityInput.value);
    const productName = document.getElementById('productName').textContent;
    const productImage = document.getElementById('productImage').src;
    const productOrigin = document.getElementById('productOrigin').textContent;
    const productPrice = parseFloat(document.getElementById('productPrice').textContent.replace("đ", "").replace(/\./g, ""));

    const orderFish = {
        productId: productId,
        quantity: quantity,
        price: productPrice,
        productName: productName,
        productImageUrl: productImage,
        origin: productOrigin,
        status: "Dang duyet",
    };
    const userId = document.getElementById("userid").value;
    fetch(`/orderTrip/${userId}`)
        .then(response => {
            if (response.status === 401 || response.status === 400) {
                alert("Vui lòng đăng nhập để thêm sản phẩm");
                return;
            }
            return response.json();
        })
        .then(orderTrips => {
            // Check if there's an existing order trip to the origin with status "Đang duyệt"
            const hasTripToOrigin = orderTrips.some(orderTrip =>
                orderTrip.location === productOrigin && orderTrip.status === "Da duyet"
            );
            if (!hasTripToOrigin) {
                alert(`Bạn cần đặt chuyến đi tới ${productOrigin} trước khi có thể đặt loại cá này.`);
                return;
            }

            // Proceed with adding the fish to the order if the condition is met
            fetch(`/add/orderFish/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderFish),
            })
                .then(response => {
                    if (response.status === 401 || response.status === 400) {
                        alert("Vui lòng đăng nhập để thêm sản phẩm");
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        alert('Đặt mua thành công!');
                        console.log('Order fish added:', data);
                    }
                })
                .catch(error => {
                    console.error('Error adding item to order:', error);
                });
        })
        .catch(error => {
            console.error("Error checking order trips:", error);
        });
}

// Lấy ID sản phẩm từ URL (giả sử bạn lấy ID từ đường dẫn như: /Product_details/{id})
const productId = window.location.pathname.split('/').pop();  // Lấy ID từ URL

// Gọi API để lấy thông tin sản phẩm
fetch(`/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      // Cập nhật nội dung trang với dữ liệu sản phẩm
      document.getElementById('productImage').src = product.imageUrl;
      document.getElementById('productName').textContent = product.name;
      document.getElementById('productPrice').innerHTML = `${formatCurrency(product.price)}`;
      document.getElementById('productDescription').textContent = product.description;
      document.getElementById('productOrigin').textContent = product.origin;
    })
    .catch(error => console.error('Error fetching product data:', error));
//
document.querySelector('.header_account_icon').addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    // Toggle display of the dropdown menu
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}



