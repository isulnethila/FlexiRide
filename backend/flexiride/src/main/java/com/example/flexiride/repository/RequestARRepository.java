package com.example.flexiride.repository;

import com.example.flexiride.model.RequestAR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestARRepository extends JpaRepository<RequestAR, Long> {
}
