package com.example.recipeapp.converters;

import com.example.recipeapp.dto.NotesDto;
import com.example.recipeapp.model.Notes;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class NotesToNotesDto implements Converter<Notes, NotesDto> {

    @Synchronized
    @Nullable
    @Override
    public NotesDto convert(Notes notes) {
        if (notes == null) {
            return null;
        }

        final NotesDto notesDto = new NotesDto();

        notesDto.setId(notes.getId());
        notesDto.setNotes(notes.getNotes());

        return notesDto;
    }
}
