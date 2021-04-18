package com.example.recipeapp.converters;

import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.model.Comment;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CommentDtoToComment implements Converter<CommentDto, Comment> {

    @Nullable
    @Override
    public Comment convert(CommentDto commentDto) {
        if (commentDto == null) {
            return null;
        }

        final Comment comment = new Comment();

        comment.setId(commentDto.getId());
        comment.setCommentAuthor(commentDto.getCommentAuthor());
        comment.setCommentText(commentDto.getCommentText());

        return comment;
    }
}
