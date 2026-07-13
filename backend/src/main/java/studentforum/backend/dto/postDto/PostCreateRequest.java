package studentforum.backend.dto.postDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostCreateRequest {
    @NotBlank(message = "Title cannot be empty")
    @Size(max = 100, message = "Title cannot be more than 100 characters")
    private String title;

    @NotBlank(message = "Content cannot be empty")
    @Size(max = 5000, message = "Content cannot be more than 5000 characters")
    private String content;

    @NotBlank(message = "Category ID cannot be empty")
    private Long categoryId;
}
