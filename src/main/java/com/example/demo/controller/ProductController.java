package com.example.demo.controller;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductResponseDTO;
import com.example.demo.model.Product;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Page;
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;
    private final UserRepository userRepo;

    public ProductController(ProductService productService, UserRepository userRepo) {
		this.productService = productService;
		this.userRepo = userRepo;
	}

	private Long getUserIdFromUserDetails(UserDetails userDetails) {
        return userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping
    public Page<ProductResponseDTO> getProducts(@PageableDefault(size = 10) Pageable pageable) {
        return productService.getProductsDTO(pageable);
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(
        @RequestBody @Valid ProductDTO productDTO,
        @AuthenticationPrincipal UserDetails userDetails) {

        Long userId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(productService.createProduct(productDTO, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
        @PathVariable Long id,
        @RequestBody ProductDTO productDTO,
        @AuthenticationPrincipal UserDetails userDetails) {
    	if (id == null) {
    	        throw new IllegalArgumentException("Product ID must not be null");
    	}
        Long userId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(productService.updateProduct(id, productDTO, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
        @PathVariable Long id,
        @AuthenticationPrincipal UserDetails userDetails) {

        Long userId = getUserIdFromUserDetails(userDetails);
        productService.deleteProduct(id, userId);
        return ResponseEntity.ok().build();
    }
}
