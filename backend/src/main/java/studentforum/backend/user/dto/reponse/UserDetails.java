package studentforum.backend.user.dto.reponse;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.post.dto.reponse.PostView;
import studentforum.backend.user.model.User;

import java.util.List;

@Getter
@Setter
public class UserDetails {
    private String username;
    private String major;
    private List<PostView> posts;

    public UserDetails(User user) {
        this.username = user.getUsername();
        this.major = user.getMajor();
        this.posts = user.getPosts().stream()
                .map(PostView::new)
                .toList();
    }
}
