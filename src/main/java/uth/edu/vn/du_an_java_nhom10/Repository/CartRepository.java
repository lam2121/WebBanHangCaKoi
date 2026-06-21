package uth.edu.vn.du_an_java_nhom10.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uth.edu.vn.du_an_java_nhom10.Model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Tìm giỏ hàng của người dùng qua userId
    Cart findByUserId(Long userId);
}
