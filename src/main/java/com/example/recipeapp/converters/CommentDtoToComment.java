package com.example.recipeapp.converters;

import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.model.Comment;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

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
        comment.setAuthor(commentDto.getAuthor());
        comment.setText(commentDto.getText());

        comment.setTime(LocalDateTime.now());

        return comment;
    }
}
