package com.example.recipeapp.converters;

import com.example.recipeapp.dto.NotesDto;
import com.example.recipeapp.model.Notes;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class NotesDtoToNotes implements Converter<NotesDto, Notes> {

    @Synchronized
    @Nullable
    @Override
    public Notes convert(NotesDto notesDto) {
        if (notesDto == null) {
            return null;
        }

        final Notes notes = new Notes();

        notes.setId(notesDto.getId());
        notes.setNotes(notesDto.getNotes());

        return notes;
    }
}
