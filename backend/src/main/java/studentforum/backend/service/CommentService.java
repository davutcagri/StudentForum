package studentforum.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studentforum.backend.dto.commentDto.CommentCreateRequest;
import studentforum.backend.dto.commentDto.CommentResponse;
import studentforum.backend.exception.NoCommentFoundException;
import studentforum.backend.model.Comment;
import studentforum.backend.model.User;
import studentforum.backend.repository.CommentRepository;
import studentforum.backend.repository.PostRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public void save(CommentCreateRequest commentCreateRequest, User user) {
        Comment comment = new Comment();
        comment.setPost(postRepository.findById(commentCreateRequest.getPostId()).orElseThrow(() -> new NoCommentFoundException("Post not found")));
        comment.setContent(commentCreateRequest.getContent());
        comment.setAuthor(user);

        commentRepository.save(comment);
    }

    public void delete(Long id, User user) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoCommentFoundException("Comment not found"));
        if (!comment.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this comment");
        }
        commentRepository.deleteById(id);
    }

    public Page<CommentResponse> getAllCommentsByPostId(Long postId, Pageable pageable) {
        return commentRepository.findAllByPostId(postId, pageable).map(CommentResponse::new);
    }
}
