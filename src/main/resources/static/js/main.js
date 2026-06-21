
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}
// Gọi API để lấy danh sách sản phẩm
fetch('/products')
    .then(response => response.json())
    .then(data => {
      const productContainer = document.querySelector('.box');
      productContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

      data.forEach(product => {
        // Tạo cấu trúc HTML cho mỗi sản phẩm
        const productCard = `
                    <div class="card">
                        <div class="small-cart">
                            <i class="fa-solid fa-heart"></i>
                            <i class="fa-solid fa-share"></i>
                        </div>
                        <div class="img">
                            <img src="${product.imageUrl}" alt="${product.name}" />
                        </div>
                        <div class="product-info">
                            <h2>${product.name}</h2>
                            <p class="text-box">${product.description}</p>
                            <span>${product.origin}</span>
                            <h3>${formatCurrency(product.price)}</h3>
                            <div class="product-star">
                                ${getStarRating(product.rating)}
                            </div>
                            <a href="/Product_details/${product.id}" class="btn" id="view">View</a>
                        </div>
                    </div>
                `;
        // Thêm sản phẩm vào container
        productContainer.insertAdjacentHTML('beforeend', productCard);
      });
    })
    .catch(error => console.error('Error:', error));

function getStarRating(rating) {
  let stars = '';

  // Làm tròn số đánh giá đến một chữ số thập phân (để hỗ trợ bước nhảy 0.5)
  let fullStars = Math.floor(rating);  // Lấy số sao đầy (số nguyên)
  let halfStars = rating - fullStars >= 0.5 ? 1 : 0;  // Kiểm tra nếu có nửa sao

  // Thêm các sao đầy
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }

  // Thêm sao nửa nếu có
  if (halfStars) {
    stars += '<i class="fa-solid fa-star-half-alt"></i>';
  }

  // Thêm các sao rỗng
  for (let i = fullStars + halfStars; i < 5; i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }

  return stars;
}
// Hàm tìm kiếm sản phẩm khi người dùng nhập từ khóa
function searchProducts() {
  // Lấy giá trị tìm kiếm từ ô input
  const searchQuery = document.getElementById("search-inp").value.toLowerCase();

  // Gọi API để lấy danh sách sản phẩm
  fetch("/products")
      .then(response => response.json()) // Giả sử API trả về dữ liệu ở dạng JSON
      .then(products => {
        // Lọc các sản phẩm có tên chứa từ khóa tìm kiếm
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );

        // Lấy phần tử nơi bạn muốn hiển thị các sản phẩm
        const productContainer = document.querySelector(".box");

        // Xóa tất cả sản phẩm cũ trước khi hiển thị kết quả mới
        productContainer.innerHTML = "";

        // Kiểm tra nếu có sản phẩm nào khớp với tìm kiếm
        if (filteredProducts.length > 0) {
          filteredProducts.forEach(product => {
            const productHTML = `
          <div class="card">
            <div class="small-cart">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-share"></i>
            </div>
            <div class="img">
              <img src="${product.imageUrl}" alt="${product.name}" />
            </div>
            <div class="product-info">
              <h2>${product.name}</h2>
              <p class="text-box">${product.description}</p>
              <h3>${formatCurrency(product.price)}</h3>
              <div class="product-star">
                ${getStarRating(product.rating)}
              </div>
              <a href="/Product_details/${product.id}" class="btn" id="view">View</a>
            </div>
          </div>
        `;
            productContainer.innerHTML += productHTML;
          });
        } else {
          productContainer.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
        }
      })
      .catch(error => {
        console.error("Có lỗi khi lấy sản phẩm:", error);
      });
}

function scrollToClass(event, className) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  const element = document.querySelector(`.${className}`);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // Cuộn mượt mà
    });
  }
}
document.querySelector('.header_account_icon').addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    // Toggle display of the dropdown menu
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});

function functio(small) {
  var full = document.getElementById("imgbox");
  full.src = small.src;
}


