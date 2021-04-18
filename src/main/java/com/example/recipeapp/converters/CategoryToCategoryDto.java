package com.example.recipeapp.converters;

import com.example.recipeapp.dto.CategoryDto;
import com.example.recipeapp.model.Category;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CategoryToCategoryDto implements Converter<Category, CategoryDto> {

    @Synchronized
    @Nullable
    @Override
    public CategoryDto convert(Category category) {
        if (category == null) {
            return null;
        }

        final CategoryDto categoryDto = new CategoryDto();

        categoryDto.setId(category.getId());
        categoryDto.setCategoryName(category.getCategoryName());

        return categoryDto;
    }
}
