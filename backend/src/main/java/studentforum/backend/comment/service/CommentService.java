package studentforum.backend.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studentforum.backend.comment.dto.request.CommentCreate;
import studentforum.backend.comment.dto.response.CommentView;
import studentforum.backend.comment.exception.NoCommentFoundException;
import studentforum.backend.comment.model.Comment;
import studentforum.backend.comment.repository.CommentRepository;
import studentforum.backend.post.repository.PostRepository;
import studentforum.backend.user.model.User;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public void save(CommentCreate commentCreateRequest, User user) {
        Comment comment = Comment.builder()
                .post(postRepository.findById(commentCreateRequest.getPostId()).orElseThrow(() -> new NoCommentFoundException("Post not found")))
                .content(commentCreateRequest.getContent())
                .author(user)
                .build();

        commentRepository.save(comment);
    }

    public void delete(Long id, User user) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new NoCommentFoundException("Comment not found"));
        if (!comment.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this comment");
        }
        commentRepository.deleteById(id);
    }

    public Page<CommentView> getAllCommentsByPostId(Long postId, Pageable pageable) {
        return commentRepository.findAllByPostId(postId, pageable).map(CommentView::new);
    }
}
