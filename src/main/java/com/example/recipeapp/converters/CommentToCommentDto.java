package com.example.recipeapp.converters;

import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.model.Comment;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CommentToCommentDto implements Converter<Comment, CommentDto> {

    @Synchronized
    @Nullable
    @Override
    public CommentDto convert(Comment comment) {
        if (comment == null) {
            return null;
        }

        final CommentDto commentDto = new CommentDto();

        commentDto.setId(comment.getId());
        commentDto.setAuthor(comment.getAuthor());
        commentDto.setText(comment.getText());
        commentDto.setTime(comment.getTime());

        return commentDto;
    }
}
