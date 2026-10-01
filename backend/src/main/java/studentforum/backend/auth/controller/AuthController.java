package studentforum.backend.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import studentforum.backend.auth.dto.request.UserAuthRequest;
import studentforum.backend.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Auth API Endpoints")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    @Operation(summary = "Authenticate user")
    public ResponseEntity<String> auth(@RequestBody @Valid UserAuthRequest userAuthRequest) {
        String token = authService.auth(userAuthRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(token);
    }
}
