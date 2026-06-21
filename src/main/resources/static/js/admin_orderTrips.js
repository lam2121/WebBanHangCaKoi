fetch(`/orderTrip`)
    .then(response => response.json())
    .then(data => {
        const tripContainer = document.querySelector('.box-container');
        tripContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

        data.forEach(trip => {
            // Tạo cấu trúc HTML cho mỗi chuyến đi
            const tripCard = `
            <div class="box">
                <p>Tên người dùng: <strong>${trip.username}</strong></p>
                <p>Email: <strong>${trip.email}</strong></p>
                <p>Địa điểm <strong>${trip.location}</strong></p>
                <p>Số điện thoại: <strong>${trip.phone}</strong></p>
                <p>Ngày đi : <strong>${trip.tripDate}</strong></p>
                <p>Lời nhắn <strong>${trip.text}</strong>
                <p>Tình trạng : <span>${trip.status}</span></p>
                <form action="" method="post">
                    <select id="status_${trip.id}" name="update_payment">
                        <option value="Dang duyet">Đang duyệt</option>
                        <option value="Da duyet">Đã duyệt</option>
                        <option value="Da hoan thanh">Đã hoàn thành</option>
                    </select>
                    <button type="button" onclick="updateStatus(${trip.id},document.getElementById('status_${trip.id}').value)" class="option-btn">Cập nhật</button>
                    <button type="button" onclick="removeOrderTrip(${trip.id})" class="delete-btn">Xóa</button>
                </form>
            </div>
        `;
            // Thêm cá vào container
            tripContainer.insertAdjacentHTML('beforeend', tripCard);
        });
    })
    .catch(error => console.error('Error:', error));
//
function updateStatus(orderTripId, newStatus) {
    const orderTrip = {
        id: orderTripId,
        status: newStatus,
    };
    fetch('/orderTrip/updateStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderTrip),
    })
        .then(fish => {
            console.log(`Updated orderFish ID ${orderTripId} to status ${newStatus}`);
            location.reload();
        })
}
function removeOrderTrip(orderTripId) {
    const orderTrip = {
        id: orderTripId,
    }
    fetch('/orderTrip/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderTrip),
    })
        .then(data => {
            confirm('Bạn có chắc muốn xóa đơn đặt chuyến đi này không?');
            alert('Xóa đơn đặt chuyến đi thành công!!');
            console.log(`Removing order trip with ID: ${orderFishId}`);
            location.reload();
        })
        .catch(error => console.error('Có lỗi khi xóa đơn đặt chuyến đi:', error));
}
function sortOrders() {
    const selectedStatus = document.getElementById('orderStatus').value; // Lấy giá trị từ dropdown

    fetch(`/orderTrip`)
        .then(response => response.json())
        .then(data => {
            let filteredOrders = data.filter(trip => trip.status === selectedStatus);  // Lọc theo trạng thái đã chọn

            // Xử lý hiển thị dữ liệu
            const boxContainer = document.querySelector('.box-container');
            boxContainer.innerHTML = ''; // Xóa các box cũ

            filteredOrders.forEach(trip => {
                const orderCard = `
                <div class="box">
                    <p>Tên người dùng: <strong>${trip.username}</strong></p>
                    <p>Email: <strong>${trip.email}</strong></p>
                    <p>Địa điểm <strong>${trip.location}</strong></p>
                    <p>Số điện thoại: <strong>${trip.phone}</strong></p>
                    <p>Ngày đi : <strong>${trip.tripDate}</strong></p>
                    <p>Lời nhắn <strong>${trip.text}</strong>
                    <p>Tình trạng : <span>${trip.status}</span></p>
                    <form action="" method="post">
                        <select id="status_${trip.id}" name="update_payment">
                            <option value="Dang duyet">Đang duyệt</option>
                            <option value="Da duyet">Đã duyệt</option>
                            <option value="Da hoan thanh">Đã hoàn thành</option>
                        </select>
                    <button type="button" onclick="updateStatus(${trip.id},document.getElementById('status_${trip.id}').value)" class="option-btn">Cập nhật</button>
                    <button type="button" onclick="removeOrderTrip(${trip.id})" class="delete-btn">Xóa</button>
                    </form>
                </div>
            `;
                boxContainer.insertAdjacentHTML('beforeend', orderCard);
            });
        })
        .catch(error => console.error('Error:', error));
}
