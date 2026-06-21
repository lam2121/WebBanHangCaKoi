package uth.edu.vn.du_an_java_nhom10.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Service.CartService;
import uth.edu.vn.du_an_java_nhom10.Service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Cart")
public class CartAPIController {

    private UserService userService;
    @Autowired
    private CartService cartService;

    @Autowired
    public void ProductController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody CartItem cartItem) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please log in to add items to the cart.");
        }
// Thêm sản phẩm vào giỏ hàng của người dùng trong cơ sở dữ liệu
        CartItem newItem = cartService.addToCart(userId, cartItem);
        if (newItem != null) {
            return ResponseEntity.ok(newItem);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding item to cart.");
        }
    }


    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        cartService.removeProductFromCart(userId, productId);
        return ResponseEntity.ok("Product removed from cart");
    }

    @GetMapping("/items/{userId}")
    public List<CartItem> getCartItems(@PathVariable("userId") Long userId) {
        return cartService.getCartItemsByUserId(userId);
    }

}

