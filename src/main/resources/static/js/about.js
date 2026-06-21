// main.js
const imgbox = document.getElementById("imgbox");
const smallImages = document.querySelectorAll(".about_small_img img");
let currentIndex = 0;

// Hàm để tự động thay đổi hình ảnh
function autoChangeImage() {
  // Tăng chỉ số hình ảnh hiện tại
  currentIndex = (currentIndex + 1) % smallImages.length; // Quay lại đầu nếu vượt quá
  imgbox.src = smallImages[currentIndex].src; // Cập nhật src cho imgbox

  // Thêm lớp 'moving' để kích hoạt hiệu ứng
  imgbox.classList.add("moving");

  // Sau một thời gian, xóa lớp 'moving'
  setTimeout(() => {
    imgbox.classList.remove("moving");
  }, 1000); // Thời gian khớp với thời gian chuyển động
}
document.querySelector('.header_account_icon').addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown');
  // Toggle display of the dropdown menu
  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});
// Gọi hàm autoChangeImage mỗi 3 giây
setInterval(autoChangeImage, 3000); // Thay đổi hình ảnh mỗi 3 giây
//
function scrollToClass(event, className) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  const element = document.querySelector(`.${className}`);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // Cuộn mượt mà
    });
  }
}
