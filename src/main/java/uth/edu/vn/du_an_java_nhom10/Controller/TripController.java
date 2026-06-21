package uth.edu.vn.du_an_java_nhom10.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Model.Trip;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.TripRepository;
import uth.edu.vn.du_an_java_nhom10.Service.ProductService;
import uth.edu.vn.du_an_java_nhom10.Service.TripService;

import java.util.List;
import java.util.Optional;
@RestController
public class TripController {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TripService tripService;
    // GET /products: Hiển thị danh sách tất cả sản phẩm
    @GetMapping("/trips")
    public List<Trip> getAllTrip() {
        return tripRepository.findAll();
    }
    // POST /products: Thêm sản phẩm mới
    @PostMapping("/trips/add")
    public ResponseEntity<Trip> addTrip(@RequestBody Trip newTrip) {
        try {
            Trip savedTrip = tripRepository.save(newTrip);
            return new ResponseEntity<>(savedTrip, HttpStatus.CREATED);  // Trả về sản phẩm vừa thêm với status 201
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);  // Lỗi server
        }
    }

    @PostMapping("/trips/delete/{id}")
    public ResponseEntity<String> deleteTrip(@PathVariable Long id) {
        boolean isDeleted = tripService.deleteTrip(id);
        if (isDeleted) {
            return ResponseEntity.ok("Chuyến đi đã được xóa.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chuyến đi không tồn tại.");
        }
    }
    // Phương thức sửa sản phẩm
    @PutMapping("trips/edit/{id}")
    public ResponseEntity<String> editTrip(@PathVariable Long id, @RequestBody Trip trip) {
        boolean isUpdated = tripService.updateTrip(id, trip);
        if (isUpdated) {
            return ResponseEntity.ok("Sản phẩm đã được sửa");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm để sửa");
        }
    }
    @PostMapping("/trips/remove")
    public ResponseEntity<String> removeTrip(@RequestBody Trip trip) {
        Long tripId = trip.getId();
        tripService.deleteTrip(tripId);
        return ResponseEntity.ok("Removed successfully");
    }
}


