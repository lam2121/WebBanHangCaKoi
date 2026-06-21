package uth.edu.vn.du_an_java_nhom10.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;
import uth.edu.vn.du_an_java_nhom10.Service.ProductService;
import uth.edu.vn.du_an_java_nhom10.Service.UserService;

import java.util.List;
import java.util.Optional;
@Controller
public class ProductController {

    private final UserService userService;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;
    @Autowired
    public ProductController(UserService userService) {
        this.userService = userService;
    }

    // GET /products/{id}: Hiển thị chi tiết sản phẩm theo id
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id, HttpSession session, Model model) {
        Long userId = (Long) session.getAttribute("loggedInUserId");
        model.addAttribute("userId", userId);
        Optional<Product> productData = productRepository.findById(id);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Trả về 404 nếu không tìm thấy sản phẩm
        }
    }
    // Hiển thị chi tiết sản phẩm với ID cụ thể
    @GetMapping("/Product_details/{id}")
    public String getProductDetails(@PathVariable("id") Long id, HttpSession session, Model model) {
        // Lấy userId từ session
        Long userId = (Long) session.getAttribute("loggedInUserId");

        if (userId != null) {
            // Lấy thông tin người dùng từ service bằng userId
            Optional<User> userOptional = userService.findById(userId);

            if (userOptional.isPresent()) {
                // Thêm đối tượng user vào model
                model.addAttribute("user", userOptional.get());
            }
        }

        // Lấy sản phẩm từ dịch vụ bằng id
        Optional<Product> product = productService.getProductById(id);

        // Thêm sản phẩm vào mô hình
        model.addAttribute("product", product);
        model.addAttribute("currentUrl", "/Product_details/" + id);

        return "details";  // Trả về view (thường là một file HTML)
    }


    // Hiển thị tất cả sản phẩm
    @GetMapping("/Product_details")
    public String getAllProducts( HttpSession session, Model model) {
        Long userId = (Long) session.getAttribute("loggedInUserId");
        model.addAttribute("userId", userId);
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products", products);
        return "details";  // View sẽ hiển thị tất cả sản phẩm
    }
}


