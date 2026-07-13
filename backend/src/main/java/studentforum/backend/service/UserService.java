package studentforum.backend.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studentforum.backend.dto.userDto.*;
import studentforum.backend.exception.NoUserFoundException;
import studentforum.backend.exception.UserAlreadyExistsException;
import studentforum.backend.model.Role;
import studentforum.backend.model.User;
import studentforum.backend.repository.UserRepository;
import studentforum.backend.search.service.UserSearchService;

import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserSearchService userSearchService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, UserSearchService userSearchService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userSearchService = userSearchService;
    }

    public void save(UserCreateRequest userCreateRequest) {
        if (userRepository.existsByUsername(userCreateRequest.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        if (userRepository.existsByEmail(userCreateRequest.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = new User();
        user.setEmail(userCreateRequest.getEmail());
        user.setUsername(userCreateRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userCreateRequest.getPassword()));
        user.setAuthorities(Set.of(Role.ROLE_USER));
        user.setMajor(userCreateRequest.getMajor());
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        try {
            userRepository.save(user);
            userSearchService.index(user);
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException();
        }
    }

    public void delete(User user) {
        userRepository.deleteById(user.getId());
        userSearchService.delete(user.getId());
    }

    public ResponseCookie auth(UserAuthRequest userAuthRequest) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userAuthRequest.getUsername(), userAuthRequest.getPassword()));

        User user = (User) auth.getPrincipal();

        return jwtService.generateToken(user.getId());
    }

    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream().map(UserSummaryResponse::new).toList();
    }

    @Transactional(readOnly = true)
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoUserFoundException(username + " not found"));
        return new UserResponse(user);
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(User authUser) {
        User user = userRepository.findById(authUser.getId())
                .orElseThrow(() -> new NoUserFoundException("User not found"));
        return new UserResponse(user);
    }

    @Transactional
    public UserResponse updateCurrentUser(User authUser, UserUpdateRequest request) {
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

        return new UserResponse(user);
    }

    public ResponseCookie logout() {
        return jwtService.deleteToken();
    }

}
