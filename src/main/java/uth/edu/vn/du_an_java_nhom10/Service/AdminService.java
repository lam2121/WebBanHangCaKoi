package uth.edu.vn.du_an_java_nhom10.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uth.edu.vn.du_an_java_nhom10.Model.Admin;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Repository.AdminRepository;
import uth.edu.vn.du_an_java_nhom10.Repository.UserRepository;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    public boolean checkUsernameExists(String username) {
        return adminRepository.findByUsername(username).isPresent();
    }


    public Optional<Admin> findUserByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public Optional<Admin> findById(Long id) {
        return adminRepository.findById(id);
    }
}