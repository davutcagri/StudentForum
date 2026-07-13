package studentforum.backend.dto.postDto;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.dto.userDto.UserSummaryResponse;
import studentforum.backend.model.Post;

@Getter
@Setter
public class PostResponse {

    private Long id;
    private String title;
    private String content;
    private UserSummaryResponse author;
    private long commentCount;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = new UserSummaryResponse(post.getAuthor());
        this.commentCount = post.getComments().size();
    }

}
