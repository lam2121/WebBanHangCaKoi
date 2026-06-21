fetch(`/user`)
    .then(response => response.json())
    .then(data => {
        const userContainer = document.querySelector('.box-container');
        userContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

        data.forEach(user => {
            // Tạo cấu trúc HTML cho mỗi chuyến đi
            const userCard = `
            <div class="box">
                <p> User id : <span>${user.id}</span> </p>
                <p> Tên người dùng : <span>${user.username}</span> </p>
                <p>Số điện thoại : <span>${user.phone}</span></p>
                <p> Email : <span>${user.email}</span> </p>
                <button type="button" class="delete-btn" onclick="removeUser(${user.id})">Delete</a>
            </div>
        `;
            // Thêm cá vào container
            userContainer.insertAdjacentHTML('beforeend', userCard);
        });
    })
    .catch(error => console.error('Error:', error));
//
function removeUser(userId) {
    const user = {
        id: userId,
    }
    fetch('/user/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(data => {
            confirm('Bạn có chắc muốn xóa tài khoản này không?');
            alert('Xóa tài khoản thành công!!');
            console.log(`Removing user with ID: ${userId}`);
            location.reload();
        })
        .catch(error => console.error('Có lỗi khi xóa tài khoản:', error));
}