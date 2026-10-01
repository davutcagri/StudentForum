package studentforum.backend.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import studentforum.backend.user.dto.reponse.UserView;
import studentforum.backend.user.dto.reponse.UserDetails;
import studentforum.backend.user.dto.request.UserCreate;
import studentforum.backend.user.dto.request.UserUpdate;
import studentforum.backend.user.model.User;
import studentforum.backend.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "User API Endpoints")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/save")
    @Operation(summary = "Save user")
    public ResponseEntity<String> save(@RequestBody @Valid UserCreate userCreate) {
        userService.save(userCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    @DeleteMapping("/delete/me")
    @Operation(summary = "Delete current user")
    public ResponseEntity<String> deleteCurrentUser(@AuthenticationPrincipal User user) {
        userService.delete(user);
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }

    @GetMapping("/{username}")
    @Operation(summary = "Get user by username")
    public ResponseEntity<UserDetails> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByUsername(username));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user")
    public ResponseEntity<UserDetails> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getCurrentUser(user));
    }

    @GetMapping("/getAll")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserView>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @PatchMapping("/update/me")
    @Operation(summary = "Update current user")
    public ResponseEntity<UserDetails> updateCurrentUser(@AuthenticationPrincipal User user, @RequestBody @Valid UserUpdate userUpdate) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateCurrentUser(user, userUpdate));
    }

}
