package uth.edu.vn.du_an_java_nhom10.Controller;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Service.CartItemService;

import java.util.List;

@RestController
public class CartItemAPIController {

    @Autowired
    private CartItemService cartItemService;
    // Endpoint to get all cart items

    // Endpoint to remove a cart item by ID
    @PostMapping("/cart/remove")
    public ResponseEntity<String> removeCartItem(@RequestBody CartItem cartItem) {
        Long productId = cartItem.getId();
        cartItemService.removeCartItem(productId);
        return ResponseEntity.ok("Removed successfully");
    }
    @PostMapping("/cart/updateQuantity")
    public ResponseEntity<CartItem> updateQuantity(@RequestBody CartItem cartItem) {
        CartItem updatedItem = cartItemService.updateQuantity(cartItem.getId(), cartItem.getQuantity());
        return ResponseEntity.ok(updatedItem); // Trả về CartItem đã cập nhật với giá tiền mới
    }
    public CartItemAPIController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }
    // Add other endpoints as needed for updating quantity, etc.
}

