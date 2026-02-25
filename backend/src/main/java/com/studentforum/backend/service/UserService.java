package com.studentforum.backend.service;

import com.studentforum.backend.dto.UserLogin;
import com.studentforum.backend.dto.UserRegister;
import com.studentforum.backend.dto.UserResponse;
import com.studentforum.backend.model.User;
import com.studentforum.backend.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public ResponseEntity<?> save(UserRegister userRegister) {
        User user = new User();
        user.setUsername(userRegister.getUsername());
        user.setName(userRegister.getName());
        user.setSurname(userRegister.getSurname());
        user.setEmail(userRegister.getEmail());
        String encodedPassword = passwordEncoder.encode(userRegister.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ResponseEntity.ok().body(Map.of("message", "User registered successfully"));
    }

    public ResponseEntity<?> auth(UserLogin userLogin) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(userLogin.getUsername());
            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(true)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(3600)
                    .build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(Map.of("message", "Login Successful"));
        } else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    public ResponseEntity<?> getCurrentUser(User user) {
        return ResponseEntity.ok().body(new UserResponse(user));
    }

}
