package com.studentforum.backend.service;

import com.studentforum.backend.dto.PostRequest;
import com.studentforum.backend.dto.PostResponse;
import com.studentforum.backend.model.Post;
import com.studentforum.backend.model.User;
import com.studentforum.backend.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public ResponseEntity<?> save(PostRequest postRequest, User author) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setAuthor(author);
        postRepository.save(post);

        return ResponseEntity.ok().body(Map.of("message", "Post saved successfully"));
    }

    public Page<PostResponse> getAll(Pageable page) {
        Page<Post> posts = postRepository.findAll(PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("id").descending()));
        return posts.map(PostResponse::new);
    }

}
