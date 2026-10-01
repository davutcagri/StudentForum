package studentforum.backend.category.exception;

public class NoCategoryFoundException extends RuntimeException {
    public NoCategoryFoundException(String message) {
        super(message);
    }
}
