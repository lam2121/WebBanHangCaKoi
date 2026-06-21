function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}
// Gọi API để lấy danh sách sản phẩm
fetch('/trips')
    .then(response => response.json())
    .then(data => {
        const tripContainer = document.querySelector('.box-container');
        tripContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

        data.forEach(trip => {
            // Tạo cấu trúc HTML cho mỗi sản phẩm
            const tripCard = `
                <div class="box">
                    <img src="${trip.imageUrl}" alt="${trip.name}" />
                    <div class="name">${trip.name}</div>
                    <p class="text-box">${trip.description}</p>
                    <button type="button" class="option-btn" onclick="Edit(${trip.id})">Cập nhật</>
                    <button type="submit" class="delete-btn" onclick="removeTrip(${trip.id})">Xóa</a>
                </div>
            `;
            // Thêm sản phẩm vào container
            tripContainer.insertAdjacentHTML('beforeend', tripCard);
        });
    })
    .catch(error => console.error('Error:', error));
//them san pham
document.getElementById("addTripForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngừng gửi form mặc định

    const newTrip = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        imageUrl: document.getElementById("imageUrl").value,
    };

    // Kiểm tra dữ liệu
    if (!newTrip.name || !newTrip.description || !newTrip.imageUrl) {
        alert("Vui lòng điền đầy đủ thông tin chuyến đi!");
        return;
    }

    // Gửi yêu cầu POST đến API
    fetch('/trips/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrip)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi từ server');
            }
            return response.json();
        })
        .then(data => {
            console.log('Chuyến đi đã được thêm:', data);
            alert('Chuyến đi đã được thêm thành công!');
            document.getElementById("addTripForm").reset(); // Làm sạch form
            location.reload()
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            alert('Đã xảy ra lỗi khi thêm chuyến đi!');
        });
});
//
let currentTripId = null; // Biến toàn cục để lưu trữ productId
function Edit(tripId) {
    currentTripId = tripId; // Lưu productId vào biến toàn cục
    const editForm = document.querySelector('.edit-trip-form');
    editForm.classList.add('active');
}
function Close(){
    const editForm = document.querySelector('.edit-trip-form');
    editForm.classList.remove('active');
}
function removeTrip(tripId) {
    const trip = {
        id: tripId,
    }
    fetch('/trips/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
    })
        .then(data => {
            confirm('Bạn có chắc muốn xóa chuyến đi này không?');
            alert('Xóa chuyến đi thành công!!');
            console.log(`Removing trip with ID: ${tripId}`);
            location.reload();
        })
        .catch(error => console.error('Có lỗi khi xóa chuyến đi:', error));
}
//
document.getElementById("editTripForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Ngừng gửi form mặc định
    if (!currentTripId) {
        alert("Không tìm thấy ID chuyến đi để sửa!");
        return;
    }
    const updatedTrip = {
        name: document.getElementById("name_updated").value,
        description: document.getElementById("description_updated").value,
        imageUrl: document.getElementById("imageUrl_updated").value,
    };

    // Gửi yêu cầu PUT đến API để sửa sản phẩm
    fetch(`/trips/edit/${currentTripId}`, {
        method: 'PUT',  // Sử dụng PUT để cập nhật sản phẩm
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTrip)  // Dữ liệu sản phẩm sau khi sửa
    })
        .then(response => {
            if (response.status === 404) {
                // Nếu mã trạng thái là 404, sản phẩm không tồn tại
                alert('ID chuyến đi không tồn tại!');
                throw new Error('ID chuyến đi không tồn tại');
            } else if (!response.ok) {
                // Nếu có lỗi khác
                throw new Error('Có lỗi xảy ra khi sửa chuyến đi');
            }
            return response.text();
        })
        .then(data => {
            console.log('Chuyến đi đã được sửa:', data);
            alert('Chuyến đi đã được sửa thành công!');
            location.reload();
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            if (error.message !== 'ID chuyến đi không tồn tại') {
                alert('Đã xảy ra lỗi khi sửa chuyến đi!');
            }
        });
});