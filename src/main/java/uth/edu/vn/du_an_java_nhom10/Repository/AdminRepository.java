package uth.edu.vn.du_an_java_nhom10.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uth.edu.vn.du_an_java_nhom10.Model.Admin;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Tìm user theo tên đăng nhập
    Optional<Admin> findByUsername(String username);
}
