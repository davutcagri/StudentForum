package studentforum.backend.dto.commentDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentCreateRequest {
    @NotBlank(message = "Content cannot be empty")
    @Size(min = 3, max = 1000, message = "Content must be between 3 and 1000 characters")
    private String content;
    @NotNull(message = "Post ID cannot be null")
    @Positive(message = "Post ID must be a positive number")
    private Long postId;
}
