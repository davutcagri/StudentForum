package studentforum.backend.comment.dto.response;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.comment.model.Comment;
import studentforum.backend.user.dto.reponse.UserView;

@Getter
@Setter
public class CommentView {
    private Long id;
    private String content;
    private UserView author;
    private Long postId;

    public CommentView(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.author = new UserView(comment.getAuthor());
        this.postId = comment.getPost().getId();
    }
}
