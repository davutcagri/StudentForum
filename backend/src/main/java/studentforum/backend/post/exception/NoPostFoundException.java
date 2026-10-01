package studentforum.backend.post.exception;

public class NoPostFoundException extends RuntimeException {
    public NoPostFoundException(String message) {
        super(message);
    }
}
