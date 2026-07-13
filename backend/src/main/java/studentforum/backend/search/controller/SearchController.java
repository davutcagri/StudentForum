package studentforum.backend.search.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import studentforum.backend.search.document.UserDocument;
import studentforum.backend.search.service.UserSearchService;

@RestController
@RequestMapping("/api/search")
@Tag(name = "Search", description = "Search API")
public class SearchController {

    private final UserSearchService userSearchService;

    public SearchController(UserSearchService userSearchService) {
        this.userSearchService = userSearchService;
    }

    @GetMapping("/users")
    @Operation(summary = "Search users")
    public ResponseEntity<Page<UserDocument>> searchUsers(
            @RequestParam @Size(max = 20) String text,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserDocument> users = userSearchService.search(text, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
}
