package studentforum.backend.dto.commentDto;

import lombok.Getter;
import lombok.Setter;
import studentforum.backend.dto.userDto.UserSummaryResponse;
import studentforum.backend.model.Comment;

@Getter
@Setter
public class CommentResponse {
    private Long id;
    private String content;
    private UserSummaryResponse author;
    private Long postId;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.author = new UserSummaryResponse(comment.getAuthor());
        this.postId = comment.getPost().getId();
    }
}
