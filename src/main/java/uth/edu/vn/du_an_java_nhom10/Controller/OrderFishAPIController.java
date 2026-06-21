package uth.edu.vn.du_an_java_nhom10.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.OrderFish;
import uth.edu.vn.du_an_java_nhom10.Model.OrderTrip;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Repository.OrderFishRepository;
import uth.edu.vn.du_an_java_nhom10.Service.OrderFishService;

import java.util.List;
import java.util.Optional;
@RestController
public class OrderFishAPIController {

    @Autowired
    private OrderFishRepository orderFishRepository;

    @Autowired
    private OrderFishService orderFishService;
    // GET /products: Hiển thị danh sách tất cả đơn đặt chuyến đi
    @GetMapping("/orderFish")
    public List<OrderFish> getAllOrderFishs() {
        return orderFishRepository.findAll();
    }
    //Hiển thị danh sách đơn đặt cá của userid
    @GetMapping("/orderFish/{userId}")
    public List<OrderFish> getOrderFishsByUserId(@PathVariable Long userId) {
        return orderFishRepository.findByUserId(userId);
    }
    // POST /products: Thêm đơn đặt chuyến đi mới
    @PostMapping("/add/orderFish/{userId}")
    public ResponseEntity<?> addOrderFish(@PathVariable Long userId, @RequestBody OrderFish orderFish) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vui lòng đăng nhập để đặt chuyến đi");
        }
        OrderFish neworderFish = orderFishService.addToOrderFish(userId, orderFish);
        if (neworderFish != null) {
            return ResponseEntity.ok(neworderFish);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error booking Fish.");
        }
    }

    @PostMapping("/orderFish/delete/{id}")
    public ResponseEntity<String> deleteOrderFish(@PathVariable Long id) {
        boolean isDeleted = orderFishService.deleteOrderFish(id);
        if (isDeleted) {
            return ResponseEntity.ok("đơn đặt chuyến đi đã được xóa.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("đơn đặt chuyến đi không tồn tại.");
        }
    }
    @PostMapping("/orderFish/updateStatus")
    public ResponseEntity<OrderFish> updateStatus(@RequestBody OrderFish orderFish) {
        OrderFish updatedItem = orderFishService.updateStatus(orderFish.getId(), orderFish.getStatus());
        return ResponseEntity.ok(updatedItem); // Trả về CartItem đã cập nhật với giá tiền mới
    }
    @PostMapping("/orderFish/remove")
    public ResponseEntity<String> removeProduct(@RequestBody OrderFish orderFish) {
        Long orderFishId = orderFish.getId();
        orderFishService.deleteOrderFish(orderFishId);
        return ResponseEntity.ok("Removed successfully");
    }
}


