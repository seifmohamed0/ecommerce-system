package com.example.demo.dto;

public class WishlistItemDTO {
    private Long id;
    private Long productId;
    private String productName;

    public WishlistItemDTO(Long id, Long productId, String productName) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
    }

    // Getters & setters
    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }
}
