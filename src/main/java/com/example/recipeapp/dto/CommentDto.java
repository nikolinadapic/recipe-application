package com.example.recipeapp.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentDto {

    private Long id;
    private String author;
    private String text;
    private LocalDateTime time;
}
