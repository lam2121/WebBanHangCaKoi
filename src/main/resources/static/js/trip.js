const trips = document.querySelector(".about");
document.querySelector('.header_account_icon').addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown');
  // Toggle display of the dropdown menu
  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});

// main.js
const imgbox = document.getElementById("imgbox");
const smallImages = document.querySelectorAll(".about_small_img img");
let currentIndex = 0;

const Account = document.querySelector(".header_account");
//
// Gọi API để lấy danh sách chuyến đi
fetch('/trips')
    .then(response => response.json())
    .then(data => {
      const tripContainer = document.querySelector('.about');
      tripContainer.innerHTML = ''; // Xóa các nội dung cũ nếu có

      data.forEach(trip => {
        // Tạo cấu trúc HTML cho mỗi chuyến đi
        const tripCard = `
        <div class="about_main">
          <div class="about_img">
            <div class="img_container">
              <img src="${trip.imageUrl}" alt="${trip.name}" id="imgbox" />
            </div>
          </div>
          <div class="about_text">
            <p>
              <strong>${trip.name}</strong> <br />
              ${trip.description}
            </p>
          </div>
        </div>
      `;
        // Thêm chuyến đi vào container
        tripContainer.insertAdjacentHTML('beforeend', tripCard);
      });
    })
    .catch(error => console.error('Error:', error));
//
// Hàm tìm kiếm chuyến đi khi người dùng nhập từ khóa
function searchTrips() {
  // Lấy giá trị tìm kiếm từ ô input
  const searchQuery = document.getElementById("search-inp").value.toLowerCase();

  // Gọi API để lấy danh sách chuyến đi
  fetch("/trips")
      .then(response => response.json()) // Giả sử API trả về dữ liệu ở dạng JSON
      .then(trips => {
        // Lọc các chuyến đi có tên chứa từ khóa tìm kiếm
        const filteredTrips = trips.filter(trip =>
            trip.name.toLowerCase().includes(searchQuery)
        );

        // Lấy phần tử nơi bạn muốn hiển thị các chuyến đi
        const tripContainer = document.querySelector(".about");

        // Xóa tất cả chuyến đi cũ trước khi hiển thị kết quả mới
        tripContainer.innerHTML = "";

        // Kiểm tra nếu có chuyến đi nào khớp với tìm kiếm
        if (filteredTrips.length > 0) {
          filteredTrips.forEach(trip => {
            const tripHTML = `
        <div class="about_main">
          <div class="about_img">
            <div class="img_container">
              <img src="${trip.imageUrl}" alt="${trip.name}" id="imgbox" />
            </div>
          </div>
          <div class="about_text">
            <p>
              <strong>${trip.name}</strong> <br />
              ${trip.description}
            </p>
          </div>
        </div>
      `;
            tripContainer.innerHTML += tripHTML;
          });
        } else {
          tripContainer.innerHTML = "<p>Không tìm thấy chuyến đi nào.</p>";
        }
      })
      .catch(error => {
        console.error("Có lỗi khi lấy chuyến đi:", error);
      });
}
// Khi trang tải xong, lấy dữ liệu từ server và chèn vào <select>
document.addEventListener("DOMContentLoaded", function () {
    fetch('/trips')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('locationSelect');
            data.forEach(trips => {
                const option = document.createElement('option');
                option.value = trips.name;
                option.textContent = trips.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching locations:', error));
});
//
document.getElementById("addOrderTripForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngừng gửi form mặc định

    const newOrderTrip = {
        username: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("locationSelect").value,
        tripDate: document.getElementById("tripDate").value,
        text:document.getElementById("text").value,
        status:"Dang duyet",
    };
    let userId = document.getElementById("userid").value;
    console.log("User ID:", userId);
    // Kiểm tra dữ liệu
    if (!newOrderTrip.username || !newOrderTrip.email || !newOrderTrip.phone || !newOrderTrip.location || !newOrderTrip.tripDate || !newOrderTrip.text) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Gửi yêu cầu POST đến API
    fetch(`/add/orderTrip/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrderTrip)
    })
        .then(response => {
            if (response.status === 401||response.status === 400) {
                alert("Vui lòng đăng nhập để đặt chuyến đi");
                return;
            }
            return response.json();
        })
        .then(data => {
            if(data) {
                console.log('Chuyến đi đã được đặt:', data);
                alert('Chuyến đi đã được đặt thành công!');
                document.getElementById("addOrderTripForm").reset(); // Làm sạch form
            }
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            alert('Đã xảy ra lỗi khi đặt chuyến đi!');
        });
});
