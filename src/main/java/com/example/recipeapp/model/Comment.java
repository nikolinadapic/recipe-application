package com.example.recipeapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String commentAuthor;
    private String commentText;

    @ManyToOne()
    private Recipe recipe;
}
