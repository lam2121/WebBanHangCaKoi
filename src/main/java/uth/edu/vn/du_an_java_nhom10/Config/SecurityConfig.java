package uth.edu.vn.du_an_java_nhom10.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers("/admin/login").permitAll()
                .requestMatchers("/admin/**").authenticated();
        // Đảm bảo CSRF vẫn được tắt trong trường hợp cần thiết, tuy nhiên có thể gây rủi ro
        http.csrf().disable();
        return http.build();
    }
}
