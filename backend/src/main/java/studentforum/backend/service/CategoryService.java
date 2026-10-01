package studentforum.backend.service;

import org.springframework.stereotype.Service;
import studentforum.backend.model.Category;
import studentforum.backend.repository.CategoryRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Map<String, String> getAll() {
        Map<String, String> data = new HashMap<>();
        List<Category> categories = categoryRepository.findAll();

        for (Category c : categories) {
            data.put(c.getId(), c.getName());
        }

        return data;
    }
}
