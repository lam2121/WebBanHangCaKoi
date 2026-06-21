package uth.edu.vn.du_an_java_nhom10.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uth.edu.vn.du_an_java_nhom10.Model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Tìm user theo tên đăng nhập
    Optional<User> findByUsername(String username);

    // Tìm user theo email
    Optional<User> findByEmail(String email);

    // Kiểm tra xem user đã tồn tại với tên đăng nhập hoặc email chưa
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
