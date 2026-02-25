package com.studentforum.backend.controller;

import com.studentforum.backend.dto.PostRequest;
import com.studentforum.backend.model.User;
import com.studentforum.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody PostRequest postRequest, @AuthenticationPrincipal User author) {
        return postService.save(postRequest, author);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable page) {
        return ResponseEntity.ok().body(postService.getAll(page));
    }

}
