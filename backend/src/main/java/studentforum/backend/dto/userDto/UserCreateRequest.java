package studentforum.backend.dto.userDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateRequest {

    @NotBlank(message = "Email cannot be empty")
    @Email
    private String email;

    @NotBlank(message = "Username cannot be empty")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Username can only contain English letters and numbers")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, max = 64, message = "Password must be between 6 and 64 characters")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    private String password;

    @NotBlank(message = "Major cannot be empty")
    private String major;
}
