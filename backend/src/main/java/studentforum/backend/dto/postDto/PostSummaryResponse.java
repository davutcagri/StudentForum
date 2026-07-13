package studentforum.backend.dto.postDto;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.model.Post;

@Getter
@Setter
public class PostSummaryResponse {

    private Long id;
    private String title;
    private String content;

    public PostSummaryResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
    }

}
