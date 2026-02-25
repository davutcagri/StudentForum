package com.studentforum.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UserRegister {

    @NotBlank(message = "Name cannot be empty")
    @Length(min = 3, max = 24, message = "Name length must be between 3 and 24 characters")
    private String name;

    @Length(min = 3, max = 24, message = "Surname length must be between 3 and 24 characters")
    private String surname;

    @NotBlank(message = "Username cannot be empty")
    @Length(min = 3, max = 16, message = "Username length must be between 3 and 16 characters")
    private String username;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Please enter a valid email address")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Length(min = 8, message = "Password length must be at least 8")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d).+$",
            message = "Password must contain at least one uppercase letter and one number."
    )
    private String password;
}
