package studentforum.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studentforum.backend.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByAuthorUsername(String username, Pageable pageable);
}
