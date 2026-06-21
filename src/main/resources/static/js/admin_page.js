function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + "<sup>đ</sup>";
}
//Tong dat ca
fetch(`/orderFish`)
    .then(response => response.json())
    .then(data => {
        let Totaling=0;
        let Totalled=0;
        let countProcessing=0;
        data.forEach(orders => {
            if(orders.status==="Dang duyet"){
                countProcessing+=1;
            }
            if(orders.status==="Da duyet"){
                Totaling+=orders.price*orders.quantity;
            }
            if(orders.status==="Da nhan hang"){
                Totalled+=orders.price*orders.quantity;
            }
        })
        document.getElementById('FishProcessing').innerHTML = countProcessing;
        document.getElementById('TotallingPrice').innerHTML=formatCurrency(Totaling);
        document.getElementById('TotalledPrice').innerHTML=formatCurrency(Totalled);
        const TotalOrderFish = document.getElementById('OrderFish');
        TotalOrderFish.innerText = data.length; // Hiển thị số lượng đơn hàng
    })
    .catch(error => console.error('Error:', error));
//Tong san pham
fetch(`/products`)
    .then(response => response.json())
    .then(data => {
        const TotalFish = document.getElementById('Fish');
        TotalFish.innerText = data.length; // Hiển thị số lượng đơn hàng
    })
    .catch(error => console.error('Error:', error));
//Tong users
fetch(`/user`)
    .then(response => response.json())
    .then(data => {
        const TotalUser = document.getElementById('User');
        TotalUser.innerText = data.length; // Hiển thị số lượng đơn hàng
    })
    .catch(error => console.error('Error:', error));
//Tong admin
fetch(`/admins`)
    .then(response => response.json())
    .then(data => {
        const TotalAdmin = document.getElementById('Admin');
        TotalAdmin.innerText = data.length; // Hiển thị số lượng đơn hàng
    })
    .catch(error => console.error('Error:', error));
//Tong dat chuyen di
fetch(`/orderTrip`)
    .then(response => response.json())
    .then(data => {
        let countProcessing=0;
        data.forEach(trip => {
            if(trip.status==="Dang duyet"){
                countProcessing+=1;
            }
        })
        document.getElementById('TripProcessing').innerHTML = countProcessing;
        const TotalOrderTrip = document.getElementById('OrderTrip');
        TotalOrderTrip.innerText = data.length; // Hiển thị số lượng đơn hàng
    })
    .catch(error => console.error('Error:', error));
//Tong chuyen di
fetch(`/trips`)
    .then(response => response.json())
    .then(data => {
        const TotalTrip = document.getElementById('Trip');
        TotalTrip.innerText = data.length; // Hiển thị số lượng đơn hàng
    })
    .catch(error => console.error('Error:', error));

