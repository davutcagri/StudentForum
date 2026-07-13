package studentforum.backend.exception;

public class NoPostFoundException extends RuntimeException {
    public NoPostFoundException(String message) {
        super(message);
    }
}
