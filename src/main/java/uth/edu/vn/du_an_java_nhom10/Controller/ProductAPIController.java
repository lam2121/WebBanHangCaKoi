package uth.edu.vn.du_an_java_nhom10.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;
import uth.edu.vn.du_an_java_nhom10.Service.ProductService;

import java.util.List;
import java.util.Optional;
@RestController
public class ProductAPIController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;
    // GET /products: Hiển thị danh sách tất cả sản phẩm
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    // POST /products: Thêm sản phẩm mới
    @PostMapping("/products/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product newProduct) {
        try {
            Product savedProduct = productRepository.save(newProduct);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);  // Trả về sản phẩm vừa thêm với status 201
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);  // Lỗi server
        }
    }
    @PostMapping("/products/remove")
    public ResponseEntity<String> removeProduct(@RequestBody Product product) {
        Long productId = product.getId();
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Removed successfully");
    }
    @PostMapping("/products/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (isDeleted) {
            return ResponseEntity.ok("Sản phẩm đã được xóa.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sản phẩm không tồn tại.");
        }
    }
    // Phương thức sửa sản phẩm
    @PutMapping("products/edit/{id}")
    public ResponseEntity<String> editProduct(@PathVariable Long id, @RequestBody Product product) {
        boolean isUpdated = productService.updateProduct(id, product);
        if (isUpdated) {
            return ResponseEntity.ok("Sản phẩm đã được sửa");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm để sửa");
        }
    }
}


