package studentforum.backend.post.dto.reponse;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.post.model.Post;
import studentforum.backend.user.dto.reponse.UserView;

@Getter
@Setter
public class PostDetails {

    private Long id;
    private String title;
    private String content;
    private UserView author;
    private long commentCount;

    public PostDetails(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = new UserView(post.getAuthor());
        this.commentCount = post.getComments().size();
    }

}
