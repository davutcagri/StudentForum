package studentforum.backend.search.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studentforum.backend.model.User;
import studentforum.backend.search.document.UserDocument;
import studentforum.backend.search.repository.UserSearchRepository;

@Service
public class UserSearchService {

    private final UserSearchRepository userSearchRepository;

    public UserSearchService(UserSearchRepository userSearchRepository) {
        this.userSearchRepository = userSearchRepository;
    }

    public void index(User user) {
        UserDocument userDocument = new UserDocument();
        userDocument.setId(user.getId());
        userDocument.setUsername(user.getUsername().toLowerCase());

        userSearchRepository.save(userDocument);
    }

    public Page<UserDocument> search(String text, Pageable pageable) {
        return userSearchRepository
                .findByUsernameStartingWith(text.toLowerCase(), pageable);
    }

    public void delete(String userId) {
        userSearchRepository.deleteById(userId);
    }

}
