package com.eventflow.gateway.config;

import com.eventflow.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                // header contains token or not
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }
                try {
                    if (!jwtUtil.validateToken(authHeader)) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
                    }

                    Claims claims = jwtUtil.extractAllClaims(authHeader);
                    String username = claims.getSubject();
                    List<String> roles = claims.get("roles", List.class);

                    // Forward user info in headers
                    ServerHttpRequest request = exchange.getRequest().mutate()
                            .header("X-User-Email", username)
                            .header("X-User-Roles", String.join(",", roles))
                            .build();
                    
                    return chain.filter(exchange.mutate().request(request).build());

                } catch (Exception e) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid access");
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {
    }
}
