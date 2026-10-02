package studentforum.backend.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studentforum.backend.category.exception.NoCategoryFoundException;
import studentforum.backend.category.model.Category;
import studentforum.backend.category.repository.CategoryRepository;
import studentforum.backend.post.dto.request.PostCreate;
import studentforum.backend.post.dto.reponse.PostDetails;
import studentforum.backend.post.exception.NoPostFoundException;
import studentforum.backend.post.model.Post;
import studentforum.backend.post.repository.PostRepository;
import studentforum.backend.user.model.User;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public void save(PostCreate postCreate, User user) {
        Post post = Post.builder()
                .title(postCreate.getTitle())
                .content(postCreate.getContent())
                .author(user)
                .category(categoryRepository.findById(postCreate.getCategoryId()).orElseThrow(() -> new NoCategoryFoundException("Category not found")))
                .build();

        postRepository.save(post);
    }

    @Transactional
    public void delete(Long id, User user) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoPostFoundException("Post not found"));
        if (!post.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this post");
        }
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<PostDetails> getAll(Pageable pageable) {
        return postRepository.findAll(pageable).map(PostDetails::new);
    }

    @Transactional(readOnly = true)
    public PostDetails getById(Long id) {
        return postRepository.findById(id).map(PostDetails::new).orElseThrow(() -> new NoPostFoundException("Post not found"));
    }

    @Transactional(readOnly = true)
    public Page<PostDetails> getAllPostsByUsername(Pageable pageable, String username) {
        return postRepository.findAllByAuthorUsername(username, pageable).map(PostDetails::new);
    }

    @Transactional(readOnly = true)
    public Page<PostDetails> getAllPostsByCategoryId(Pageable pageable, String categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NoCategoryFoundException("Category not found"));
        return postRepository.findAllByCategory(category, pageable).map(PostDetails::new);
    }
}
