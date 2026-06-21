package uth.edu.vn.du_an_java_nhom10.Controller;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;
import uth.edu.vn.du_an_java_nhom10.Model.User;
import uth.edu.vn.du_an_java_nhom10.Service.CartItemService;

import java.util.List;

@Controller
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    // In your CartController.java
}

