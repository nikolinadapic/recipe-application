package com.example.recipeapp.services;

import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.model.Recipe;

public interface CommentService {

    Recipe addComment(Long recipeId, CommentDto commentDto);
}
