package uth.edu.vn.du_an_java_nhom10.Service;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Model.Trip;
import uth.edu.vn.du_an_java_nhom10.Repository.TripRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public boolean deleteTrip(Long id) {
        Optional<Trip> trip = tripRepository.findById(id);
        if (trip.isPresent()) {
            tripRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean updateTrip(Long id, Trip trip) {
        Optional<Trip> existingTrip = tripRepository.findById(id);
        if (existingTrip.isPresent()) {
            Trip TripToUpdate = existingTrip.get();
            TripToUpdate.setName(trip.getName());
            TripToUpdate.setDescription(trip.getDescription());
            TripToUpdate.setImageUrl(trip.getImageUrl());
            tripRepository.save(TripToUpdate);
            return true;
        } else {
            return false;
        }
    }

    public List<Trip> getAllTrip() {
        return tripRepository.findAll();
    }
}


