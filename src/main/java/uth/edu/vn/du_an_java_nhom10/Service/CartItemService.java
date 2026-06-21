package uth.edu.vn.du_an_java_nhom10.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uth.edu.vn.du_an_java_nhom10.Model.Cart;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Repository.CartItemRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.CartRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    // Add item to cart
    public CartItem addToCart(Long userId, CartItem cartItem) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        cartItem.setUser(user);  // Link cart item to user
        return cartItemRepository.save(cartItem);
    }

    // Update quantity of an item
    public CartItem updateQuantity(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Item not found"));
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    // Remove item from cart
    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    // Get all items in the user's cart
    public List<CartItem> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }
}
