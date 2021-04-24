package com.example.recipeapp.repositories;

import com.example.recipeapp.model.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long> {
}
