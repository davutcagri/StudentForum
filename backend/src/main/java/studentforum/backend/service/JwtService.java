package studentforum.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import studentforum.backend.model.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expiration}")
    private long EXPIRATION;

    @Value("${jwt.cookie.secure}")
    private boolean SECURE;

    public ResponseCookie generateToken(String id) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, id);
    }

    public Boolean validateToken(String token, User user) {
        String userId = extractUserId(token);
        return (userId.equals(user.getId()) && !isTokenExpired(token));
    }

    public ResponseCookie deleteToken() {
        return ResponseCookie.from("AUTH-TOKEN", "")
                .httpOnly(true)
                .secure(SECURE)
                .sameSite("Strict")
                .path("/")
                .maxAge(EXPIRATION / 1000)
                .build();
    }

    public String extractUserId(String token) {
        return Jwts.parser()
                .setSigningKey(getSignatureKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private Boolean isTokenExpired(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getSignatureKey())
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration().before(new Date());
    }

    private ResponseCookie createToken(Map<String, Object> claims, String id) {
        String jwt = Jwts.builder()
                .setClaims(claims)
                .setSubject(id)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSignatureKey(), SignatureAlgorithm.HS256)
                .compact();

        return ResponseCookie.from("AUTH-TOKEN", jwt)
                .httpOnly(true)
                .secure(SECURE)
                .sameSite("Strict")
                .path("/")
                .maxAge(EXPIRATION / 1000)
                .build();
    }

    private Key getSignatureKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
