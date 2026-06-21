fetch(`/orderFish`)
    .then(response => response.json())
    .then(data => {
        const fishContainer = document.querySelector('.box-container');
        fishContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

        data.forEach(fish => {
            // Tạo cấu trúc HTML cho mỗi chuyến đi
            const user = fish.user;
            const fishCard = `
            <div class="box" xmlns="http://www.w3.org/1999/html">
                <p>Mã đơn hàng : <span>${fish.id}</span></p>
                <p>User id : <span>${user.id}</span></p>
                <p>Tên : <span>${user.username}</span></p>
                <p>Số điện thoại : <span>${user.phone}</span></p>
                <p>Email : <span>${user.email}</span></p>
                <p>Địa điểm lấy hàng: <span>${fish.origin}</span></p>
                <p>Sản phẩm đặt hàng : <span>${fish.productName}</span></p>
                <p>Số lượng: <span>${fish.quantity}</span></p>
                <p>Tổng : <span>${formatCurrency(fish.price*fish.quantity)}</span></p>
                <p>Hình thức thanh toán : <span>Tiền mặt</span></p>
                <p id="statusFish">Tình trạng : <span>${fish.status}</span></p>
                <form action="" method="post">
                    <select id="status_${fish.id}" name="update_payment">
                        <option value="Dang duyet">Đang duyệt</option>
                        <option value="Da duyet">Đã duyệt</option>
                        <option value="Da nhan hang">Đã nhận hàng</option>
                    </select> 
                    <button type="button" onclick="updateStatus(${fish.id},document.getElementById('status_${fish.id}').value)" class="option-btn">Cập nhật</button>
                    <button type="button" onclick="removeOrderFish(${fish.id})" class="delete-btn">Xóa</button>
                </form>
            </div>
            `;
            // Thêm cá vào container
            fishContainer.insertAdjacentHTML('beforeend', fishCard);
        });
    })
    .catch(error => console.error('Error:', error));
//
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}
//
function updateStatus(orderFishId, newStatus) {
    const orderFish = {
        id: orderFishId,
        status: newStatus,
    };
    fetch('/orderFish/updateStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderFish),
    })
        .then(fish => {
            console.log(`Updated orderFish ID ${orderFishId} to status ${newStatus}`);
            location.reload();
        })
}
function removeOrderFish(orderFishId) {
    const orderFish = {
        id: orderFishId,
    }
    fetch('/orderFish/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderFish),
    })
        .then(data => {
            confirm('Bạn có chắc muốn xóa đơn đặt hàng này không?');
            alert('Xóa đơn đặt hàng thành công!!');
            console.log(`Removing order fish with ID: ${orderFishId}`);
            location.reload();
        })
        .catch(error => console.error('Có lỗi khi xóa đơn đặt hàng:', error));
}
function sortOrders() {
    const selectedStatus = document.getElementById('orderStatus').value; // Lấy giá trị từ dropdown

    fetch(`/orderFish`)
        .then(response => response.json())
        .then(data => {
            let filteredOrders = data.filter(fish => fish.status === selectedStatus);  // Lọc theo trạng thái đã chọn

            // Xử lý hiển thị dữ liệu
            const boxContainer = document.querySelector('.box-container');
            boxContainer.innerHTML = ''; // Xóa các box cũ

            filteredOrders.forEach(fish => {
                const user = fish.user;
                const orderCard = `
                    <div class="box">
                        <p>Mã đơn hàng : <span>${fish.id}</span></p>
                        <p>User id : <span>${user.id}</span></p>
                        <p>Tên : <span>${user.username}</span></p>
                        <p>Số điện thoại : <span>${user.phone}</span></p>
                        <p>Email : <span>${user.email}</span></p>
                        <p>Địa điểm lấy hàng: <span>${fish.origin}</span></p>
                        <p>Sản phẩm đặt hàng : <span>${fish.productName}</span></p>
                        <p>Số lượng: <span>${fish.quantity}</span></p>
                        <p>Tổng : <span>${formatCurrency(fish.price)}</span></p>
                        <p>Hình thức thanh toán : <span>Tiền mặt</span></p>
                        <p>Tình trạng : <span>${fish.status}</span></p>
                        <form action="" method="post">
                            <select id="status_${fish.id}" name="update_payment">
                                <option value="Dang duyet">Đang duyệt</option>
                                <option value="Da duyet">Đã duyệt</option>
                                <option value="Da nhan hang">Đã nhận hàng</option>
                            </select> 
                            <button type="button" onclick="updateStatus(${fish.id},document.getElementById('status_${fish.id}').value)" class="option-btn">Cập nhật</button>
                            <button type="button" onclick="removeOrderFish(${fish.id})" class="delete-btn">Xóa</button>
                        </form>
                    </div>
                `;
                boxContainer.insertAdjacentHTML('beforeend', orderCard);
            });
        })
        .catch(error => console.error('Error:', error));
}