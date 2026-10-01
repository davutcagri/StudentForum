package studentforum.backend.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studentforum.backend.category.model.Category;
import studentforum.backend.category.repository.CategoryRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Map<String, String> getAll() {
        Map<String, String> data = new HashMap<>();
        List<Category> categories = categoryRepository.findAll();

        for (Category c : categories) {
            data.put(c.getId(), c.getName());
        }

        return data;
    }
}
