package studentforum.backend.category.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import studentforum.backend.category.service.CategoryService;

import java.util.Map;

@RestController
@RequestMapping("/api/category")
@Tag(name = "Category", description = "Category API Endpoints")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/getAll")
    @Operation(summary = "Get all categories")
    public Map<String, String> getAll() {
        return categoryService.getAll();
    }
}
