package studentforum.backend.exception;

public class NoCommentFoundException extends RuntimeException {
    public NoCommentFoundException(String message) {
        super(message);
    }
}
