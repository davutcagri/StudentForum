package studentforum.backend.search.service;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import studentforum.backend.search.model.UserDocument;
import studentforum.backend.search.repository.UserSearchRepository;
import studentforum.backend.user.model.User;
import studentforum.backend.user.repository.UserRepository;

import java.util.List;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserReindexService {

    private final UserRepository userRepository;
    private final UserSearchRepository userSearchRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void reindexUsers() {
        List<User> users = userRepository.findAll();

        Set<String> userIds = users.stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        Iterable<UserDocument> documents = userSearchRepository.findAll();

        for (UserDocument document : documents) {
            if (!userIds.contains(document.getId())) {
                userSearchRepository.delete(document);
            }
        }

        for (User user : users) {
            UserDocument document = UserDocument.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .build();

            userSearchRepository.save(document);
        }
    }

}
