package com.example.demo.service;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    public Page<Category> findAll(Pageable pageable) {
        return categoryRepo.findAll(pageable);
    }
    public Category addCategory(CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());

        if (dto.getParentId() != null) {
            Category parent = categoryRepo.findById(dto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
            category.setParentCategory(parent);
        }

        return categoryRepo.save(category);
    }

    public Category updateCategory(Long id, CategoryDTO dto) {
        Category existing = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existing.setName(dto.getName());

        if (dto.getParentId() != null) {
            Category parent = categoryRepo.findById(dto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
            existing.setParentCategory(parent);
        } else {
            existing.setParentCategory(null);
        }

        return categoryRepo.save(existing);
    }

    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }
}
