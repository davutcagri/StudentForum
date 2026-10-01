package studentforum.backend.comment.exception;

public class NoCommentFoundException extends RuntimeException {
    public NoCommentFoundException(String message) {
        super(message);
    }
}
