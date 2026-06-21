package uth.edu.vn.du_an_java_nhom10.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uth.edu.vn.du_an_java_nhom10.Model.CartItem;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PayOSService {

    @Value("${payos.client-id}")
    private String clientId;

    @Value("${payos.api-key}")
    private String apiKey;

    @Value("${payos.checksum-key}")
    private String checksumKey;

    @Value("${app.url}")
    private String appUrl;

    private final CartService cartService;

    public PayOSService(CartService cartService) {
        this.cartService = cartService;
    }

    public String createPayment(Long userId) {
        List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);

        long total = 0;
        for (CartItem item : cartItems) {
            total += item.getPrice() * item.getQuantity();
        }

        long orderCode = System.currentTimeMillis();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", clientId);
        headers.set("x-api-key", apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("orderCode", orderCode);
        body.put("amount", total);
        body.put("description", "Thanh toan ca Koi");
        body.put("returnUrl", appUrl + "/payment/success");
        body.put("cancelUrl", appUrl + "/payment/cancel");

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = new RestTemplate().postForEntity(
                "https://api-merchant.payos.vn/v2/payment-requests",
                request,
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        Map<String, Object> data =
                (Map<String, Object>) responseBody.get("data");

        return data.get("checkoutUrl").toString();
    }
}
