package com.studentforum.backend.controller;

import com.studentforum.backend.dto.UserLogin;
import com.studentforum.backend.dto.UserRegister;
import com.studentforum.backend.model.User;
import com.studentforum.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody UserRegister userRegister) {
        return userService.save(userRegister);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(@Valid @RequestBody UserLogin userLogin) {
        return userService.auth(userLogin);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User user) {
        return userService.getCurrentUser(user);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        return userService.logout(response);
    }

}
