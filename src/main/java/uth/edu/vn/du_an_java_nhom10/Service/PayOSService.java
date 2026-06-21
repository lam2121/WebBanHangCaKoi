package uth.edu.vn.du_an_java_nhom10.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PayOSService {

    private final CartService cartService;

    public PayOSService(CartService cartService) {
        this.cartService = cartService;
    }

    public String createPayment(Long userId) {
        List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);

        if (cartItems == null || cartItems.isEmpty()) {
            throw new RuntimeException("Giỏ hàng đang trống");
        }

        int totalAmount = 0;

        for (CartItem item : cartItems) {
            totalAmount += item.getPrice() * item.getQuantity();
        }

        System.out.println("TOTAL AMOUNT = " + totalAmount);

        // Chỗ này dùng totalAmount để tạo link PayOS
        // amount(totalAmount)

        return "link-thanh-toan-payos";
    }
}