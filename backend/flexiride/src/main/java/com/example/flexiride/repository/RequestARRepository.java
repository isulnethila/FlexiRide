package com.example.flexiride.repository;

import com.example.flexiride.model.RequestAR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestARRepository extends JpaRepository<RequestAR, Long> {
    List<RequestAR> findByRequestUsername(String requestUsername);
}
