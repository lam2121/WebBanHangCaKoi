// search.js
// Hàm tìm kiếm sản phẩm khi người dùng nhập từ khóa
function searchProducts() {
    const searchInput = document.getElementById('search-inp').value.toLowerCase();
    const productContainer = document.getElementById('product-container');

    // Gọi API để lấy danh sách sản phẩm (giả sử API trả về danh sách sản phẩm dưới dạng JSON)
    fetch('/products') // Điều chỉnh API phù hợp với backend của bạn
        .then(response => response.json())
        .then(data => {
            productContainer.innerHTML = ''; // Xóa các sản phẩm cũ

            // Duyệt qua từng sản phẩm và kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm
            const filteredProducts = data.filter(product =>
                product.name.toLowerCase().includes(searchInput)
            );

            // Hiển thị các sản phẩm phù hợp với từ khóa tìm kiếm
            filteredProducts.forEach(product => {
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
              <h3>${product.price}<sup>đ</sup></h3>
              <div class="product-star">
                ${getStarRating(product.rating)}
              </div>
              <a href="/Product_details/${product.id}" class="btn" id="view">View</a>
            </div>
          </div>
        `;
                productContainer.insertAdjacentHTML('beforeend', productCard);
            });

            if (filteredProducts.length === 0) {
                productContainer.innerHTML = '<p>No products found</p>';
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Hàm tạo sao đánh giá sản phẩm
function getStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }
    return stars;
}
