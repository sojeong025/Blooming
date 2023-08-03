package com.ssafy.backend.domain.wishlist.repository;

import com.ssafy.backend.domain.wishlist.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long>{
//    @Query("select p from Product p join fetch ")
    List<Wishlist> findAllByUserId(Long userId);

}
