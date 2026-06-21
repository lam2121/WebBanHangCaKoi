package uth.edu.vn.du_an_java_nhom10.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import uth.edu.vn.du_an_java_nhom10.Model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Bạn có thể thêm các truy vấn tùy chỉnh ở đây nếu cần
}
