package uth.edu.vn.du_an_java_nhom10.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uth.edu.vn.du_an_java_nhom10.Model.Cart;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Repository.CartRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.CartItemRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository; // To fetch the user

    // Add item to cart for a specific user
    @Transactional
    public CartItem addToCart(Long userId, CartItem cartItem) {
        // Fetch the User object from the database
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Set the User object in the CartItem
        cartItem.setUser(user);

        // Lưu CartItem vào cơ sở dữ liệu
        return cartItemRepository.save(cartItem);

    }

    // Remove product from user's cart
    @Transactional
    public void removeProductFromCart(Long userId, Long productId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        for (CartItem cartItem : cartItems) {
            if (cartItem.getProduct().getId().equals(productId)) {
                cartItemService.removeCartItem(cartItem.getId());  // Call the service to remove item
                break;
            }
        }
    }

    public List<CartItem> getCartItemsByUserId(Long userId) {
        return cartItemService.getCartItems(userId);
    }
}
