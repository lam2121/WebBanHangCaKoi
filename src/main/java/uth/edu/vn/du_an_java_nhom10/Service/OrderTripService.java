package uth.edu.vn.du_an_java_nhom10.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uth.edu.vn.du_an_java_nhom10.Model.*;
import uth.edu.vn.du_an_java_nhom10.Repository.OrderTripRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.TripRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderTripService {

    @Autowired
    private OrderTripRepository orderTripRepository;
    @Autowired
    private UserRepository userRepository;
    public Optional<OrderTrip> getOrderTripById(Long id) {
        return orderTripRepository.findById(id);
    }

    public boolean deleteOrderTrip(Long id) {
        Optional<OrderTrip> orderTrip = orderTripRepository.findById(id);
        if (orderTrip.isPresent()) {
            orderTripRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<OrderTrip> getAllOrderTrip() {
        return orderTripRepository.findAll();
    }
    // Add item to cart for a specific user
    @Transactional
    public OrderTrip addToOrderTrip(Long userId, OrderTrip orderTrip) {
        // Fetch the User object from the database
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Set the User object in the CartItem
        orderTrip.setUser(user);

        // Lưu CartItem vào cơ sở dữ liệu
        return orderTripRepository.save(orderTrip);
    }
    public OrderTrip updateStatus(Long orderTripId, String status) {
        OrderTrip orderTrip = orderTripRepository.findById(orderTripId).orElseThrow(() -> new RuntimeException("Item not found"));
        orderTrip.setStatus(status);
        return orderTripRepository.save(orderTrip);
    }
}


