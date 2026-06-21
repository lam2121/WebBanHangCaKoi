package uth.edu.vn.du_an_java_nhom10.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.model.v2.paymentRequests.CreatePaymentLinkRequest;
import vn.payos.model.v2.paymentRequests.CreatePaymentLinkResponse;

@Service
public class PayOSService {

    private final PayOS payOS;
    private final CartService cartService;

    @Value("${app.url}")
    private String appUrl;

    public PayOSService(PayOS payOS, CartService cartService) {
        this.payOS = payOS;
        this.cartService = cartService;
    }

    public String createPayment(Long userId) {
        try {
            Long amount = 10000L; // đổi chỗ này thành tổng giỏ hàng sau

            CreatePaymentLinkRequest request = CreatePaymentLinkRequest.builder()
                    .orderCode(System.currentTimeMillis())
                    .amount(amount)
                    .description("Thanh toan don hang")
                    .cancelUrl(appUrl + "/payment/cancel")
                    .returnUrl(appUrl + "/payment/success")
                    .build();

            CreatePaymentLinkResponse response = payOS.paymentRequests().create(request);

            return response.getCheckoutUrl();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("PayOS error: " + e.getMessage());
        }
    }
}