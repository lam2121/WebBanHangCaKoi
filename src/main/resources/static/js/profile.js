document.querySelector('.header_account_icon').addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    // Toggle display of the dropdown menu
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});
// Gọi API để lấy danh sách đặt hàng
let userId=document.getElementById('userid').value
console.log(userId);
fetch(`/orderFish/${userId}`)
    .then(response => response.json())
    .then(data => {
        const fishContainer = document.querySelector('.order-item1');
        fishContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

        data.forEach(fish => {
            // Tạo cấu trúc HTML cho mỗi chuyến đi
            const fishCard = `
            <p><span>Tên sản phẩm:</span> ${fish.productName}</p>
            <p><span>Nguồn gốc:</span> ${fish.origin}</p>
            <p><span>Giá:</span> ${formatCurrency(fish.price)}</p>
            <p><span>Số lượng:</span> ${fish.quantity}</p>
            <p><span>Tình trạng:</span> ${fish.status}</p>
            <hr/>
            `;
            // Thêm cá vào container
            fishContainer.insertAdjacentHTML('beforeend', fishCard);
        });
    })
    .catch(error => console.error('Error:', error));
//
// Gọi API để lấy danh sách đặt chuyến đi
fetch(`/orderTrip/${userId}`)
    .then(response => response.json())
    .then(data => {
        const tripsContainer = document.querySelector('.order-item2');
        tripsContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có
        data.forEach(trips => {
            // Tạo cấu trúc HTML cho mỗi chuyến đi
            const tripsCard = `
            <p><span>Mã chuyến đi:</span> ${trips.id}</p>
            <p><span>Địa điểm:</span> ${trips.location}</p>
            <p><span>Ngày đi:</span> ${trips.tripDate}</p>
            <p><span>Tình trạng:</span> ${trips.status}</p>
            <hr/>
            `;
            // Thêm cá vào container
            tripsContainer.insertAdjacentHTML('beforeend', tripsCard);
        });
    })
    .catch(error => console.error('Error:', error));
//
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}