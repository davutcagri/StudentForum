package studentforum.backend.dto.userDto;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.model.User;

@Getter
@Setter
public class UserSummaryResponse {

    private String username;
    private String major;

    public UserSummaryResponse(User user) {
        this.username = user.getUsername();
        this.major = user.getMajor();
    }
}
