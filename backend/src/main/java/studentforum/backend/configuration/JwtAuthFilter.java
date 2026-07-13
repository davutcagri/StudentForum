package studentforum.backend.configuration;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import studentforum.backend.model.User;
import studentforum.backend.service.CustomUserDetailsService;
import studentforum.backend.service.JwtService;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userService;

    public JwtAuthFilter(JwtService jwtService, CustomUserDetailsService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = null;
        String userId = null;

        try {
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("AUTH-TOKEN".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            if (token != null && !token.isBlank()) {
                userId = jwtService.extractUserId(token);
            }

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userService.loadUserById(userId);
                if (jwtService.validateToken(token, user)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (JwtException | UsernameNotFoundException e) {
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }

}
