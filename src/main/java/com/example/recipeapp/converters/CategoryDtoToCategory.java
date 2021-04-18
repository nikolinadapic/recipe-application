package com.example.recipeapp.converters;

import com.example.recipeapp.dto.CategoryDto;
import com.example.recipeapp.model.Category;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoToCategory implements Converter<CategoryDto, Category> {

    @Synchronized
    @Nullable
    @Override
    public Category convert(CategoryDto categoryDto) {
        if (categoryDto == null) {
            return null;
        }

        final Category category = new Category();

        category.setId(categoryDto.getId());
        category.setCategoryName(categoryDto.getCategoryName());

        return category;
    }
}
