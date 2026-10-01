package studentforum.backend.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studentforum.backend.category.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
}
