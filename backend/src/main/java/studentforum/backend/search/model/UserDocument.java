package studentforum.backend.search.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;

@Document(indexName = "user_index")
@Data
@Builder
public class UserDocument implements Serializable {
    @Id
    @NotBlank(message = "ID cannot be empty")
    private String id;
    @Field(type = FieldType.Text, name = "username")
    private String username;
}
