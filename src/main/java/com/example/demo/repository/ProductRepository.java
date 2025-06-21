package com.example.demo.repository;

import com.example.demo.model.Product;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	 @EntityGraph(attributePaths = {"owner", "category"})
	 Page<Product> findAll(Pageable pageable);

	 @EntityGraph(attributePaths = {"owner", "category"})
	 List<Product> findAll();

	 List<Product> findByOwnerId(Long ownerId);
}
