package com.studentforum.backend.dto;

import com.studentforum.backend.model.Post;
import lombok.Data;

@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private UserResponse author;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = new UserResponse(post.getAuthor());
    }
}
