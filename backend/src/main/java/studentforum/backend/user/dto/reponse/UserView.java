package studentforum.backend.user.dto.reponse;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.user.model.User;

@Getter
@Setter
public class UserView {

    private String username;
    private String major;

    public UserView(User user) {
        this.username = user.getUsername();
        this.major = user.getMajor();
    }
}
