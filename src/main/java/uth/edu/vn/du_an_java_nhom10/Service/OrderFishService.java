package uth.edu.vn.du_an_java_nhom10.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uth.edu.vn.du_an_java_nhom10.Model.*;
import uth.edu.vn.du_an_java_nhom10.Repository.OrderFishRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderFishService {

    private CartService cartService;
    @Autowired
    private OrderFishRepository orderFishRepository;
    @Autowired
    private UserRepository userRepository;
    public Optional<OrderFish> getOrderFishById(Long id) {
        return orderFishRepository.findById(id);
    }
    public OrderFishService(CartService cartService,
                            OrderFishRepository orderFishRepository) {
        this.cartService = cartService;
        this.orderFishRepository = orderFishRepository;
    }
    public boolean deleteOrderFish(Long id) {
        Optional<OrderFish> orderFish = orderFishRepository.findById(id);
        if (orderFish.isPresent()) {
            orderFishRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<OrderFish> getAllOrderFish() {
        return orderFishRepository.findAll();
    }
    // Add item to cart for a specific user
    @Transactional
    public OrderFish addToOrderFish(Long userId, OrderFish orderFish) {
        // Fetch the User object from the database
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Set the User object in the CartItem
        orderFish.setUser(user);

        // Lưu CartItem vào cơ sở dữ liệu
        return orderFishRepository.save(orderFish);

    }
    public OrderFish updateStatus(Long orderFishId, String status) {
        OrderFish orderFish = orderFishRepository.findById(orderFishId).orElseThrow(() -> new RuntimeException("Item not found"));
        orderFish.setStatus(status);
        return orderFishRepository.save(orderFish);
    }
    public void createOrderFishFromCart(Long userId) {
        List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);

        for (CartItem item : cartItems) {
            OrderFish orderFish = new OrderFish();

            orderFish.setId(item.getProduct().getId());
            orderFish.setQuantity(item.getQuantity());
            orderFish.setPrice(item.getPrice());
            orderFish.setProductName(item.getProductName());
            orderFish.setProductImageUrl(item.getProductImageUrl());
            orderFish.setOrigin(item.getProductOrigin());
            orderFish.setStatus("Da duyet");

            orderFishRepository.save(orderFish);
        }
    }
}


