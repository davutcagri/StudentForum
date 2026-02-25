package com.studentforum.backend.dto;

import com.studentforum.backend.model.User;
import lombok.Data;

@Data
public class UserResponse {
    private String username;
    private String name;
    private String surname;

    public UserResponse(User user) {
        this.username = user.getUsername();
        this.name = user.getName();
        this.surname = user.getSurname();
    }
}
