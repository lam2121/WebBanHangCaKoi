package uth.edu.vn.du_an_java_nhom10.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uth.edu.vn.du_an_java_nhom10.Model.OrderFish;

import java.util.List;

@Repository
public interface OrderFishRepository extends JpaRepository<OrderFish, Long> {
    List<OrderFish> findByUserId(Long userId);
}
