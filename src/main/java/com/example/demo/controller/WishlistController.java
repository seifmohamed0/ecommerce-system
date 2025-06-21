package com.example.demo.controller;

import com.example.demo.dto.WishlistItemDTO;
import com.example.demo.model.User;
import com.example.demo.model.WishlistItem;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.service.WishlistService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    private final WishlistService wishlistService;
    private final UserRepository userRepo;
    private final UserService userService;

    public WishlistController(WishlistService wishlistService, UserRepository userRepo, UserService userService) {
		super();
		this.wishlistService = wishlistService;
		this.userRepo = userRepo;
		this.userService = userService;
	}

	@GetMapping("/wishlist")
    public ResponseEntity<List<WishlistItemDTO>> getWishlist(Principal principal) {
        User currentUser = userService.findByUsername(principal.getName());
        List<WishlistItem> items = wishlistService.getUserWishlist(currentUser);

        List<WishlistItemDTO> dtoList = items.stream()
            .map(item -> new WishlistItemDTO(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

	@GetMapping
	public ResponseEntity<List<WishlistItemDTO>> getUserWishlist(@AuthenticationPrincipal UserDetails userDetails) {
	    User user = userRepo.findByUsername(userDetails.getUsername())
	                        .orElseThrow(() -> new RuntimeException("User not found"));
	    List<WishlistItem> items = wishlistService.getWishlist(user);
	    List<WishlistItemDTO> dtoList = items.stream()
	        .map(item -> new WishlistItemDTO(
	            item.getId(),
	            item.getProduct().getId(),
	            item.getProduct().getName()
	        ))
	        .collect(Collectors.toList());

	    return ResponseEntity.ok(dtoList);
	}

	@PostMapping("/{productId}")
	public ResponseEntity<?> addToWishlist(@PathVariable Long productId,
	                                       @AuthenticationPrincipal UserDetails userDetails) {
	    if (userDetails == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("يجب تسجيل الدخول أولاً");
	    }
	    User user = userRepo.findByUsername(userDetails.getUsername())
	                        .orElseThrow(() -> new RuntimeException("User not found"));
	    try {
	        WishlistItem item = wishlistService.add(productId, user);
	        WishlistItemDTO dto = new WishlistItemDTO(
	            item.getId(),
	            item.getProduct().getId(),
	            item.getProduct().getName()
	        );
	        return ResponseEntity.ok(dto);
	    } catch (RuntimeException e) {
	        if ("Product already in wishlist".equals(e.getMessage())) {
	            return ResponseEntity.status(409).body("المنتج موجود بالفعل في المفضلة");
	        }
	        throw e;
	    }
	}


    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long productId,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByUsername(userDetails.getUsername())
                            .orElseThrow(() -> new RuntimeException("User not found"));
        wishlistService.remove(productId, user);
        return ResponseEntity.ok().build();
    }
}
