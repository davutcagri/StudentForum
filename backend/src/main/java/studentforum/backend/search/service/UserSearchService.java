package studentforum.backend.search.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studentforum.backend.search.model.UserDocument;
import studentforum.backend.search.repository.UserSearchRepository;
import studentforum.backend.user.model.User;
import studentforum.backend.user.repository.UserRepository;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UserSearchService {

    private final UserSearchRepository userSearchRepository;

    public void index(User user) {
        UserDocument userDocument = UserDocument.builder()
                .id(user.getId())
                .username(user.getUsername().toLowerCase())
                .build();

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
