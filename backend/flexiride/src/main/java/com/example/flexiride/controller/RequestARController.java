package com.example.flexiride.controller;

import com.example.flexiride.dto.RequestARDTO;
import com.example.flexiride.service.RequestARService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/requestar")
public class RequestARController {

    private final RequestARService requestARService;

    @Autowired
    public RequestARController(RequestARService requestARService) {
        this.requestARService = requestARService;
    }

    @GetMapping("/all")
    public List<RequestARDTO> getAllRequestARs() {
        return requestARService.getAllRequestARs();
    }

    @PostMapping("/create")
    public RequestARDTO createRequestAR(@RequestBody RequestARDTO requestARDTO) {
        return requestARService.createRequestAR(requestARDTO);
    }
}
