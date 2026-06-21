function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}
// Gọi API để lấy danh sách sản phẩm
fetch('/products')
    .then(response => response.json())
    .then(data => {
        const productContainer = document.querySelector('.box-container');
        productContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

        data.forEach(product => {
            // Tạo cấu trúc HTML cho mỗi sản phẩm
            const productCard = `
                <div class="box">
                    <img src="${product.imageUrl}" alt="${product.name}" />
                    <div class="name">${product.name}</div>
                    <span>${product.origin}</span>
                    <div class="price">${formatCurrency(product.price)}</div>
                    <p class="text-box">${product.description}</p>
                    <div class="product-star">${getStarRating(product.rating)}</div>
                    <button type="button" class="option-btn" onclick="Edit(${product.id})">Cập nhật</>
                    <button type="submit" class="delete-btn" onclick="removeProduct(${product.id})">Xóa</a>
                </div>
            `;
            // Thêm sản phẩm vào container
            productContainer.insertAdjacentHTML('beforeend', productCard);
        });
    })
    .catch(error => console.error('Error:', error));
//
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
//them san pham
document.getElementById("addProductForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngừng gửi form mặc định

    const newProduct = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        imageUrl: document.getElementById("imageUrl").value,
        rating: parseFloat(document.getElementById("rating").value),
        origin: document.getElementById("origin").value,
    };

    // Kiểm tra dữ liệu
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imageUrl || !newProduct.rating || !newProduct.origin) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
        return;
    }

    // Gửi yêu cầu POST đến API
    fetch('/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi từ server');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sản phẩm đã được thêm:', data);
            alert('Sản phẩm đã được thêm thành công!');
            document.getElementById("addProductForm").reset(); // Làm sạch form
            location.reload()
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            alert('Đã xảy ra lỗi khi thêm sản phẩm!');
        });
});
// Khi trang tải xong, lấy dữ liệu từ server và chèn vào <select>
document.addEventListener("DOMContentLoaded", function () {
    fetch('/trips')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('origin');
            data.forEach(trips => {
                const option = document.createElement('option');
                option.value = trips.name;
                option.textContent = trips.name;
                select.appendChild(option);
            });
            const selected = document.getElementById('origin_updated');
            data.forEach(trips => {
                const option = document.createElement('option');
                option.value = trips.name;
                option.textContent = trips.name;
                selected.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching locations:', error));
});
//
let currentProductId = null; // Biến toàn cục để lưu trữ productId

function Edit(productId) {
    currentProductId = productId; // Lưu productId vào biến toàn cục
    const editForm = document.querySelector('.edit-product-form');
    editForm.classList.add('active');
}
function Close(){
    const editForm = document.querySelector('.edit-product-form');
    editForm.classList.remove('active');
}
function removeProduct(productId) {
    const product = {
        id: productId,
    }
    fetch('/products/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(data => {
            confirm('Bạn có chắc muốn xóa sản phẩm này không?');
            alert('Xóa sản phẩm thành công!!');
            console.log(`Removing product with ID: ${productId}`);
            location.reload();
        })
        .catch(error => console.error('Có lỗi khi xóa hàng:', error));
}
//
document.getElementById("editProductForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Ngừng gửi form mặc định
    if (!currentProductId) {
        alert("Không tìm thấy ID sản phẩm để sửa!");
        return;
    }
    const updatedProduct = {
        name: document.getElementById("name_updated").value,
        description: document.getElementById("description_updated").value,
        price: parseFloat(document.getElementById("price_updated").value),
        imageUrl: document.getElementById("imageUrl_updated").value,
        rating: parseFloat(document.getElementById("rating_updated").value),
        origin: document.getElementById("origin_updated").value,
    };

    // Gửi yêu cầu PUT đến API để sửa sản phẩm
    fetch(`/products/edit/${currentProductId}`, {
        method: 'PUT',  // Sử dụng PUT để cập nhật sản phẩm
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)  // Dữ liệu sản phẩm sau khi sửa
    })
        .then(response => {
            if (response.status === 404) {
                // Nếu mã trạng thái là 404, sản phẩm không tồn tại
                alert('ID sản phẩm không tồn tại!');
                throw new Error('ID sản phẩm không tồn tại');
            } else if (!response.ok) {
                // Nếu có lỗi khác
                throw new Error('Có lỗi xảy ra khi sửa sản phẩm');
            }
            return response.text();
        })
        .then(data => {
            console.log('Sản phẩm đã được sửa:', data);
            alert('Sản phẩm đã được sửa thành công!');
            location.reload();
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            if (error.message !== 'ID sản phẩm không tồn tại') {
                alert('Đã xảy ra lỗi khi sửa sản phẩm!');
            }
        });
});