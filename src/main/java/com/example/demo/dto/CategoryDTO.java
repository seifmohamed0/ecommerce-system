package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryDTO {
    @NotBlank(message = "اسم التصنيف مطلوب")
    private String name;
    private Long parentId;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
    
}
