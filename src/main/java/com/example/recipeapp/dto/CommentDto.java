package com.example.recipeapp.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDto {

    private Long id;
    private Long recipeId;
    private String commentAuthor;
    private String commentText;
}
