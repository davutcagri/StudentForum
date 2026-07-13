package studentforum.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studentforum.backend.dto.postDto.PostCreateRequest;
import studentforum.backend.dto.postDto.PostResponse;
import studentforum.backend.exception.NoCategoryFoundException;
import studentforum.backend.exception.NoPostFoundException;
import studentforum.backend.model.Post;
import studentforum.backend.model.User;
import studentforum.backend.repository.CategoryRepository;
import studentforum.backend.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    public PostService(PostRepository postRepository, CategoryRepository categoryRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
    }

    public void save(PostCreateRequest postCreateRequest, User user) {
        Post post = new Post();
        post.setTitle(postCreateRequest.getTitle());
        post.setContent(postCreateRequest.getContent());
        post.setAuthor(user);
        post.setCategory(categoryRepository.findById(postCreateRequest.getCategoryId()).orElseThrow(() -> new NoCategoryFoundException("Category not found")));

        postRepository.save(post);
    }

    public void delete(Long id, User user) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoPostFoundException("Post not found"));
        if (!post.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this post");
        }
        postRepository.deleteById(id);
    }

    public Page<PostResponse> getAll(Pageable pageable) {
        return postRepository.findAll(pageable).map(PostResponse::new);
    }

    public PostResponse getById(Long id) {
        return postRepository.findById(id).map(PostResponse::new).orElseThrow(() -> new NoPostFoundException("Post not found"));
    }

    public Page<PostResponse> getAllPostsByUsername(Pageable pageable, String username) {
        return postRepository.findAllByAuthorUsername(username, pageable).map(PostResponse::new);
    }
}
