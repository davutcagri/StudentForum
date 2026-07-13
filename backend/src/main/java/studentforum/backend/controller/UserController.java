package studentforum.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import studentforum.backend.dto.userDto.*;
import studentforum.backend.model.User;
import studentforum.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "User API")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    @Operation(summary = "Save user")
    public ResponseEntity<String> save(@RequestBody @Valid UserCreateRequest userCreateRequest) {
        userService.save(userCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    @DeleteMapping("/delete/me")
    @Operation(summary = "Delete current user")
    public ResponseEntity<String> deleteCurrentUser(@AuthenticationPrincipal User user) {
        userService.delete(user);
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }

    @PostMapping("/auth")
    @Operation(summary = "Authenticate user")
    public ResponseEntity<String> auth(@RequestBody @Valid UserAuthRequest userAuthRequest) {
        ResponseCookie cookie = userService.auth(userAuthRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Authenticated successfully");
    }

    @GetMapping("/getAll")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserSummaryResponse>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @GetMapping("/{username}")
    @Operation(summary = "Get user by username")
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByUsername(username));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getCurrentUser(user));
    }

    @PatchMapping("/update/me")
    @Operation(summary = "Update current user")
    public ResponseEntity<UserResponse> updateCurrentUser(@AuthenticationPrincipal User user, @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateCurrentUser(user, userUpdateRequest));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user")
    public ResponseEntity<Void> logout() {
        ResponseCookie cookie = userService.logout();
        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }

}
