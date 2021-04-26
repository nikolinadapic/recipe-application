package com.example.recipeapp.repositories;

import com.example.recipeapp.model.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    List<Comment> findAllByRecipeIdOrderByTimeDesc(Long recipeId);
}
