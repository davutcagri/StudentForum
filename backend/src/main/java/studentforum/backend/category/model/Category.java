package studentforum.backend.category.model;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.*;
import lombok.*;
import studentforum.backend.post.model.Post;

import java.util.List;

@Entity
@Table(name = "categories")
@Tag(name = "Category", description = "Category API")
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    @OneToMany(mappedBy = "category")
    private List<Post> posts;
}
