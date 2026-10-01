package studentforum.backend.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studentforum.backend.auth.service.JwtService;
import studentforum.backend.search.service.UserSearchService;
import studentforum.backend.user.dto.reponse.UserView;
import studentforum.backend.user.dto.reponse.UserDetails;
import studentforum.backend.user.dto.request.UserCreate;
import studentforum.backend.user.dto.request.UserUpdate;
import studentforum.backend.user.exception.NoUserFoundException;
import studentforum.backend.user.exception.UserAlreadyExistsException;
import studentforum.backend.user.model.Role;
import studentforum.backend.user.model.User;
import studentforum.backend.user.repository.UserRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserSearchService userSearchService;

    @Transactional
    public void save(UserCreate userCreate) {
        if (userRepository.existsByUsername(userCreate.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        if (userRepository.existsByEmail(userCreate.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = User.builder()
                .email(userCreate.getEmail())
                .username(userCreate.getUsername())
                .password(passwordEncoder.encode(userCreate.getPassword()))
                .authorities(Set.of(Role.ROLE_USER))
                .major(userCreate.getMajor())
                .isEnabled(true)
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .build();

        try {
            userRepository.save(user);
            userSearchService.index(user);
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException();
        }
    }

    @Transactional
    public void delete(User user) {
        userRepository.deleteById(user.getId());
        userSearchService.delete(user.getId());
    }

    @Transactional(readOnly = true)
    public UserDetails getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoUserFoundException(username + " not found"));
        return new UserDetails(user);
    }

    @Transactional(readOnly = true)
    public UserDetails getCurrentUser(User authUser) {
        User user = userRepository.findById(authUser.getId())
                .orElseThrow(() -> new NoUserFoundException("User not found"));
        return new UserDetails(user);
    }

    @Transactional(readOnly = true)
    public List<UserView> getAllUsers() {
        return userRepository.findAll().stream().map(UserView::new).toList();
    }

    @Transactional
    public UserDetails updateCurrentUser(User authUser, UserUpdate request) {
        User user = userRepository.findById(authUser.getId()).orElseThrow(() -> new NoUserFoundException("User not found"));

        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsernameAndIdNot(request.getUsername(), user.getId())) {
                throw new UserAlreadyExistsException("Username already exists");
            }
            user.setUsername(request.getUsername());
            userSearchService.index(user);
        }

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmailAndIdNot(request.getEmail(), user.getId())) {
                throw new UserAlreadyExistsException("Email already exists");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getMajor() != null) {
            user.setMajor(request.getMajor());
        }

        return new UserDetails(user);
    }
}
