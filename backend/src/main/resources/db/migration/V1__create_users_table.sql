CREATE TABLE users
(
    id                          VARCHAR(36)  NOT NULL,
    email                       VARCHAR(255) NOT NULL,
    username                    VARCHAR(255) NOT NULL,
    password                    VARCHAR(255) NOT NULL,
    major                       VARCHAR(255),
    is_account_non_expired      BOOLEAN      NOT NULL DEFAULT TRUE,
    is_account_non_locked       BOOLEAN      NOT NULL DEFAULT TRUE,
    is_credentials_non_expired  BOOLEAN      NOT NULL DEFAULT TRUE,
    is_enabled                  BOOLEAN      NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT uk_users_username UNIQUE (username)
);

CREATE TABLE authorities
(
    user_id VARCHAR(36) NOT NULL,
    role    VARCHAR(50) NOT NULL,
    CONSTRAINT pk_authorities PRIMARY KEY (user_id, role),
    CONSTRAINT fk_authorities_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
