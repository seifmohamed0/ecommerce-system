package com.example.demo.dto;

import com.example.demo.model.Product;

public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String ownerUsername;
    private String categoryName;
	public ProductResponseDTO(Long id, String name, String description, Double price, String ownerUsername,
			String categoryName) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.ownerUsername = ownerUsername;
		this.categoryName = categoryName;
	}
	public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.ownerUsername = product.getOwner() != null ? product.getOwner().getUsername() : "غير معروف";
        this.categoryName = product.getCategory() != null ? product.getCategory().getName() : "غير مصنف";
    }
	public ProductResponseDTO() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getOwnerUsername() {
		return ownerUsername;
	}
	public void setOwnerUsername(String ownerUsername) {
		this.ownerUsername = ownerUsername;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

}