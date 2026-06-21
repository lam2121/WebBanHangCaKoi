package uth.edu.vn.du_an_java_nhom10.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uth.edu.vn.du_an_java_nhom10.Model.OrderTrip;

import java.util.List;
@Repository
public interface OrderTripRepository extends JpaRepository<OrderTrip, Long> {
    List<OrderTrip> findByUserId(Long userId);
}
