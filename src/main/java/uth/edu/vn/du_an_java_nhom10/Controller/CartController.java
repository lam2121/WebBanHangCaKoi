package uth.edu.vn.du_an_java_nhom10.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Service.CartService;
import uth.edu.vn.du_an_java_nhom10.Service.UserService;

import java.util.List;
import java.util.Optional;

@Controller
public class CartController {

    private UserService userService   ;
    @Autowired
    private CartService cartService;
    @Autowired
    public void ProductController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/Cart")
    public String getCart(HttpSession session, Model model) {
        // Lấy userId từ session
        Long userId = (Long) session.getAttribute("loggedInUserId");

        if (userId != null) {
            // Lấy thông tin người dùng từ service bằng userId
            Optional<User> userOptional = userService.findById(userId);

            // Nếu tìm thấy người dùng
            if (userOptional.isPresent()) {
                // Lấy các sản phẩm trong giỏ hàng của userId từ database
                List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);
                // Thêm đối tượng user và cartItems vào model
                model.addAttribute("user", userOptional.get());
                model.addAttribute("cartItems", cartItems);

                return "checkout"; // Trả về trang giỏ hàng
            }
        } else {
            return "redirect:/user/login"; // Nếu không có userId, chuyển hướng đến trang đăng nhập
        }

        return "redirect:/user/login"; // Trường hợp nếu không tìm thấy userId
    }

}
