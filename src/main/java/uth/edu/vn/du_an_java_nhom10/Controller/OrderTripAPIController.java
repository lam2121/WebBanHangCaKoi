package uth.edu.vn.du_an_java_nhom10.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.*;
import uth.edu.vn.du_an_java_nhom10.Repository.OrderTripRepository;
import uth.edu.vn.du_an_java_nhom10.Service.OrderTripService;
import java.util.List;
@RestController
public class OrderTripAPIController {

    @Autowired
    private OrderTripRepository orderTripRepository;

    @Autowired
    private OrderTripService orderTripService;
    // GET /products: Hiển thị danh sách tất cả đơn đặt chuyến đi
    @GetMapping("/orderTrip")
    public List<OrderTrip> getAllOrderTrips() {
        return orderTripRepository.findAll();
    }
    //Hiển thị danh sách đơn đặt chuyến đi của userid
    @GetMapping("/orderTrip/{userId}")
    public List<OrderTrip> getOrderTripsByUserId(@PathVariable Long userId) {
        return orderTripRepository.findByUserId(userId);
    }
    // POST /products: Thêm đơn đặt chuyến đi mới
    @PostMapping("/add/orderTrip/{userId}")
    public ResponseEntity<?> addOrderTrip(@PathVariable Long userId, @RequestBody OrderTrip orderTrip) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vui lòng đăng nhập để đặt chuyến đi");
        }
        OrderTrip neworderTrip = orderTripService.addToOrderTrip(userId, orderTrip);
        if (neworderTrip != null) {
            return ResponseEntity.ok(neworderTrip);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error booking trip.");
        }
    }

    @PostMapping("/orderTrip/delete/{id}")
    public ResponseEntity<String> deleteOrderTrip(@PathVariable Long id) {
        boolean isDeleted = orderTripService.deleteOrderTrip(id);
        if (isDeleted) {
            return ResponseEntity.ok("đơn đặt chuyến đi đã được xóa.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("đơn đặt chuyến đi không tồn tại.");
        }
    }
    @PostMapping("/orderTrip/updateStatus")
    public ResponseEntity<OrderTrip> updateStatus(@RequestBody OrderTrip orderTrip) {
        OrderTrip updatedItem = orderTripService.updateStatus(orderTrip.getId(), orderTrip.getStatus());
        return ResponseEntity.ok(updatedItem); // Trả về CartItem đã cập nhật với giá tiền mới
    }
    @PostMapping("/orderTrip/remove")
    public ResponseEntity<String> removeProduct(@RequestBody OrderTrip orderTrip) {
        Long orderTripId = orderTrip.getId();
        orderTripService.deleteOrderTrip(orderTripId);
        return ResponseEntity.ok("Removed successfully");
    }
}


