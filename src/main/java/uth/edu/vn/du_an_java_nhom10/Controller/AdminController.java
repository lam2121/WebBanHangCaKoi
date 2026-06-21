package uth.edu.vn.du_an_java_nhom10.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import uth.edu.vn.du_an_java_nhom10.Model.Admin;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Service.AdminService;
import uth.edu.vn.du_an_java_nhom10.Service.UserService;

import java.util.Optional;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    // Hiển thị trang đăng nhập
    @GetMapping("/login")
    public String showLoginPage() {
        return "admin_login"; // Chỉ đường đến file login.html
    }
    // Đăng nhập người dùng
    @PostMapping("/login")
    public String loginAdmin(@RequestParam String username,
                            @RequestParam String password,
                            HttpSession session,
                            Model model) {
        Optional<Admin> adminOptional = adminService.findUserByUsername(username);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (password.equals(admin.getPassword())) {  // Direct password comparison
                session.setAttribute("loggedInAdminId", admin.getId()); // Store only userId
                return "redirect:/Admin"; // Redirect to main page after successful login
            } else {
                model.addAttribute("error", "Mật khẩu không chính xác.");
                return "admin_login";
            }
        } else {
            model.addAttribute("error", "Tên đăng nhập không tồn tại.");
            return "admin_login";
        }
    }

    // Display profile page
    @GetMapping("/profile")
    public String adminProfile(HttpSession session, Model model) {
        Long adminId = (Long) session.getAttribute("loggedInAdminId"); // Retrieve userId from session
        if (adminId != null) {
            Optional<Admin> adminOptional = adminService.findById(adminId);
            if (adminOptional.isPresent()) {
                model.addAttribute("admin", adminOptional.get());
                return "profile";
            }
        }
        return "redirect:/admin/login";
    }
    // Đăng xuất người dùng
    @GetMapping("/logout")
    public String logoutAdmin(HttpSession session) {
        session.invalidate(); // Hủy session của người dùng
        return "redirect:/admin/login";
    }
}