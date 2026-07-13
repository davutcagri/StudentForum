package studentforum.backend.model;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_USER,
    ROLE_ADMIN;

    @Override
    public @Nullable String getAuthority() {
        return name();
    }
}
