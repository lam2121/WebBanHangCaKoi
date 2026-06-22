package uth.edu.vn.du_an_java_nhom10.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uth.edu.vn.du_an_java_nhom10.Service.CartService;
import vn.payos.PayOS;
import vn.payos.model.v2.paymentRequests.CreatePaymentLinkRequest;

@Controller
public class PaymentController {
    private final CartService cartService;
    private final PayOS payOS;

    public PaymentController(CartService cartService, PayOS payOS) {
        this.cartService = cartService;
        this.payOS = payOS;
    }

    @PostMapping("/api/payments/create")
    public ResponseEntity<?> createPayment() throws Exception {

        long orderCode = System.currentTimeMillis() / 1000;
        long amount = 100000;

        CreatePaymentLinkRequest request = CreatePaymentLinkRequest.builder()
                .orderCode(orderCode)
                .amount(amount)
                .description("Thanh toan don hang")
                .returnUrl(System.getenv("APP_URL") + "/payment/success")
                .cancelUrl(System.getenv("APP_URL") + "/payment/cancel")
                .build();

        var paymentLink = payOS.paymentRequests().create(request);

        return ResponseEntity.ok(paymentLink.getCheckoutUrl());
    }
    @GetMapping("/payment/success")
    public String paymentSuccess(HttpSession session) {
        Long userId = (Long) session.getAttribute("loggedInUserId");
        if (userId != null) {
            cartService.clearCartByUserId(userId);
        }
        return "PaymentSuccess";
    }

    @GetMapping("/payment/cancel")
    public String paymentCancel() {
        return "redirect:/Cart";
    }
}
