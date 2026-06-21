const searchIn = document.getElementById("search-inp");
const searchBt = document.getElementById("button-addon2");

searchBt.addEventListener("click", function () {
  localStorage.setItem("searching", searchIn.value);
  window.location.href = "Fish.html";
});
const productApi = "../pages/data.json";
function checkSearch() {
  fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
      let searchData = localStorage.getItem("searching");
      if (searchData) {
        var container = document.getElementById("body");
        var htmls = "";
        var filterProduct = products.filter(
          (element) =>
            element.title.toLowerCase().indexOf(searchData.toLowerCase()) >= 0
        );
        filterProduct.forEach((element) => {
          if (element.status == "Enabled") {
            htmls += `
            <div class="product" id="body">
                <div class="box">
            <div class="card">
            <div class="small-cart">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-share"></i>
            </div>
            <div class="img">
              <img src="../${element.img}" alt="" />
            </div>
            <div class="product-info">
              <h2>${element.title}</h2>
              <p>
                ${element.description}
              </p>
              <h3>300.000<sup>đ</sup>-500.000<sup>đ</sup></h3>
              <div class="product-star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <a href="product_details.html?id=${element.id}" class="btn">View</a>
            </div>
          </div>
        </div>
        </div>
                `;
          }
        });

        container.innerHTML = htmls;
        localStorage.removeItem("searching");
      }
    })
    .join("");
}
checkSearch();
