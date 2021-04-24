package com.example.recipeapp.services.implementation;

import com.example.recipeapp.converters.CommentDtoToComment;
import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.model.Comment;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repositories.CommentRepository;
import com.example.recipeapp.repositories.RecipeRepository;
import com.example.recipeapp.services.CommentService;
import com.example.recipeapp.services.RecipeService;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private final RecipeRepository recipeRepository;
    private final CommentDtoToComment commentConverter;

    public CommentServiceImpl(RecipeRepository recipeRepository, CommentDtoToComment commentConverter) {
        this.recipeRepository = recipeRepository;
        this.commentConverter = commentConverter;
    }

    @Override
    public Recipe addComment(Long recipeId, CommentDto commentDto) {
        Comment comment = commentConverter.convert(commentDto);
        if (recipeRepository.findById(recipeId).isPresent()) {
            recipeRepository.findById(recipeId)
                    .map(recipe -> {
                        recipe.addComment(comment);
                        return recipeRepository.save(recipe);
                    });
        }
        return null;
    }
}
