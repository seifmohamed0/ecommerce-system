package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.model.WishlistItem;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }

    public WishlistItem add(Long productId, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        boolean exists = wishlistRepository.existsByUserIdAndProductId(user.getId(), productId);
        if (exists) {
            throw new RuntimeException("Product already in wishlist");
        }
        WishlistItem wishlist = new WishlistItem(user, product);
        return wishlistRepository.save(wishlist);
    }
    public List<WishlistItem> getUserWishlist(User user) {
        return wishlistRepository.findByUser(user);
    }
    public void remove(Long productId, User user) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        List<WishlistItem> items = wishlistRepository.findAllByUserAndProduct(user, product);
        if (items.isEmpty()) {
            throw new RuntimeException("Wishlist item not found");
        }
        wishlistRepository.deleteAll(items);
    }

    public List<WishlistItem> getWishlist(User user) {
        return wishlistRepository.findByUserId(user.getId());
    }
}
