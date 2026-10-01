package studentforum.backend.post.dto.reponse;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.post.model.Post;

@Getter
@Setter
public class PostView {

    private Long id;
    private String title;
    private String content;

    public PostView(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
    }

}
