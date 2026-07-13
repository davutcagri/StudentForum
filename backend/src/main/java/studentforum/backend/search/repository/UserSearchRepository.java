package studentforum.backend.search.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import studentforum.backend.search.document.UserDocument;


@Repository
public interface UserSearchRepository extends ElasticsearchRepository<UserDocument, String> {
    Page<UserDocument> findByUsernameStartingWith(String username, Pageable pageable);
}
