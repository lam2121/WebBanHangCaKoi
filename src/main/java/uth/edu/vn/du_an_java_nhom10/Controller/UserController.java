package uth.edu.vn.du_an_java_nhom10.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import uth.edu.vn.du_an_java_nhom10.Model.OrderFish;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Repository.UserRepository;
import uth.edu.vn.du_an_java_nhom10.Service.UserService;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    // Hiển thị trang đăng ký
    @GetMapping("/register")
    public String showRegisterPage() {
        return "register"; // Chỉ đường đến file register.html
    }

    // Hiển thị trang đăng nhập
    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // Chỉ đường đến file login.html
    }
    // Đăng ký người dùng mới
    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        if (userService.checkUsernameExists(user.getUsername())) {
            model.addAttribute("error", "Tên đăng nhập đã tồn tại.");
            return "register";
        }
        if (userService.checkEmailExists(user.getEmail())) {
            model.addAttribute("error", "Email đã tồn tại.");
            return "register";
        }
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            model.addAttribute("error", "Mật khẩu xác nhận không khớp.");
            return "register";
        }
        userService.registerUser(user);
        model.addAttribute("message", "Đăng ký thành công.");

        return "register";
    }

    // Đăng nhập người dùng
    @PostMapping("/login")
    public String loginUser(@RequestParam String username,
                            @RequestParam String password,
                            HttpSession session,
                            Model model) {
        Optional<User> userOptional = userService.findUserByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (password.equals(user.getPassword())) {  // Direct password comparison
                session.setAttribute("loggedInUserId", user.getId()); // Store only userId
                return "redirect:/Home"; // Redirect to main page after successful login
            } else {
                model.addAttribute("error", "Mật khẩu không chính xác.");
                return "login";
            }
        } else {
            model.addAttribute("error", "Tên đăng nhập không tồn tại.");
            return "login";
        }
    }

    // Display profile page
    @GetMapping("/profile")
    public String userProfile(HttpSession session, Model model) {
        Long userId = (Long) session.getAttribute("loggedInUserId"); // Retrieve userId from session
        if (userId != null) {
            Optional<User> userOptional = userService.findById(userId);
            if (userOptional.isPresent()) {
                model.addAttribute("user", userOptional.get());
                return "profile";
            }
        }
        return "redirect:/user/login";
    }

    @GetMapping("/forget")
    public String showForgetPasswordForm() {
        return "forget";
    }

    @PostMapping("/forget")
    public String handleForgetPassword(@RequestParam String email, Model model) {
        Optional<User> userOptional = userService.findUserByEmail(email);
        if (userOptional.isPresent()) {
            // If email exists, retrieve the user's password (not recommended for security reasons)
            User user = userOptional.get();
            model.addAttribute("message", "Your password is: " + user.getPassword());
        } else {
            model.addAttribute("error", "Email does not exist.");
        }
        return "forget";
    }

    // Đăng xuất người dùng
    @GetMapping("/logout")
    public String logoutUser(HttpSession session) {
        session.invalidate(); // Hủy session của người dùng
        return "redirect:/user/login";
    }
}