package studentforum.backend.dto.userDto;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.dto.postDto.PostSummaryResponse;
import studentforum.backend.model.User;

import java.util.List;

@Getter
@Setter
public class UserResponse {
    private String username;
    private String major;
    private List<PostSummaryResponse> posts;

    public UserResponse(User user) {
        this.username = user.getUsername();
        this.major = user.getMajor();
        this.posts = user.getPosts().stream()
                .map(PostSummaryResponse::new)
                .toList();
    }
}
