package studentforum.backend.dto.userDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {

    @Email
    private String email;
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Username can only contain English letters and numbers")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;
    private String major;

}
