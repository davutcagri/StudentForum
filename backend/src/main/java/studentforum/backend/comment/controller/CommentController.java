package studentforum.backend.comment.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import studentforum.backend.comment.dto.request.CommentCreate;
import studentforum.backend.comment.dto.response.CommentView;
import studentforum.backend.comment.service.CommentService;
import studentforum.backend.user.model.User;

@RestController
@RequestMapping("/api/comment")
@Tag(name = "Comment", description = "Comment API Endpoints")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/save")
    @Operation(summary = "Save comment")
    public ResponseEntity<String> save(@RequestBody @Valid CommentCreate commentCreateRequest, @AuthenticationPrincipal User user) {
        commentService.save(commentCreateRequest, user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Comment saved successfully");
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete comment")
    public ResponseEntity<String> delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        commentService.delete(id, user);
        return ResponseEntity.status(HttpStatus.OK).body("Comment deleted successfully");
    }

    @GetMapping("/getAll/{postId}")
    @Operation(summary = "Get all comments by post id")
    public ResponseEntity<Page<CommentView>> getAllCommentsByPostId(@PathVariable Long postId, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getAllCommentsByPostId(postId, pageable));
    }
}
