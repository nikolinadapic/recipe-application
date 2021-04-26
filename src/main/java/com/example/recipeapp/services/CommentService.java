package com.example.recipeapp.services;

import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.model.Comment;
import com.example.recipeapp.model.Recipe;

import java.util.List;

public interface CommentService {

    Recipe addComment(Long recipeId, CommentDto commentDto);

    List<Comment> getOrderedComments(Long recipeId);
}
