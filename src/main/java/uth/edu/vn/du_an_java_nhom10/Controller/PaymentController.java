package uth.edu.vn.du_an_java_nhom10.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.payos.PayOS;
import vn.payos.model.v2.paymentRequests.CreatePaymentLinkRequest;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PayOS payOS;

    public PaymentController(PayOS payOS) {
        this.payOS = payOS;
    }

    @PostMapping("/create")
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
}
