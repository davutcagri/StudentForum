package studentforum.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import studentforum.backend.dto.postDto.PostCreateRequest;
import studentforum.backend.dto.postDto.PostResponse;
import studentforum.backend.model.User;
import studentforum.backend.service.PostService;


@RestController
@RequestMapping("/api/post")
@Tag(name = "Post", description = "Post API")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/save")
    @Operation(summary = "Save post")
    public ResponseEntity<String> save(@RequestBody @Valid PostCreateRequest postCreateRequest, @AuthenticationPrincipal User user) {
        postService.save(postCreateRequest, user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Post saved successfully");
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete post by id")
    public ResponseEntity<String> delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        postService.delete(id, user);
        return ResponseEntity.status(HttpStatus.OK).body("Post deleted successfully");
    }

    @GetMapping("/getAll")
    @Operation(summary = "Get all posts")
    public ResponseEntity<Page<PostResponse>> getAll(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAll(pageable));
    }

    @GetMapping("/get/{id}")
    @Operation(summary = "Get post details with id")
    public ResponseEntity<PostResponse> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getById(id));
    }

    @GetMapping("/getAll/{username}")
    @Operation(summary = "Get all posts by username")
    public ResponseEntity<Page<PostResponse>> getAllPostsByUsername(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable, @PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPostsByUsername(pageable, username));
    }
}
