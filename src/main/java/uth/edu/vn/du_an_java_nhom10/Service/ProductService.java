package uth.edu.vn.du_an_java_nhom10.Service;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uth.edu.vn.du_an_java_nhom10.Model.Product;
import uth.edu.vn.du_an_java_nhom10.Repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public boolean deleteProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean updateProduct(Long id, Product product) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product prodToUpdate = existingProduct.get();
            prodToUpdate.setName(product.getName());
            prodToUpdate.setDescription(product.getDescription());
            prodToUpdate.setPrice(product.getPrice());
            prodToUpdate.setImageUrl(product.getImageUrl());
            prodToUpdate.setRating(product.getRating());
            prodToUpdate.setOrigin(product.getOrigin());
            productRepository.save(prodToUpdate);
            return true;
        } else {
            return false;
        }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}


