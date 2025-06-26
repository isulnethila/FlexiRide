package com.example.flexiride.controller;

import com.example.flexiride.dto.RequestARDTO;
import com.example.flexiride.service.RequestARService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import com.example.flexiride.service.NotificationService;
import com.example.flexiride.model.Notification;

@RestController
@RequestMapping("/requestar")
public class RequestARController {

    private final RequestARService requestARService;
    private final NotificationService notificationService;

    @Autowired
    public RequestARController(RequestARService requestARService, NotificationService notificationService) {
        this.requestARService = requestARService;
        this.notificationService = notificationService;
    }

    @GetMapping("/all")
    public List<RequestARDTO> getAllRequestARs() {
        return requestARService.getAllRequestARs();
    }

    @GetMapping("/user/{requestUsername}")
    public List<RequestARDTO> getRequestARsByRequestUsername(@PathVariable String requestUsername) {
        return requestARService.getRequestARsByRequestUsername(requestUsername);
    }

    @PostMapping("/create")
    public RequestARDTO createRequestAR(@RequestBody RequestARDTO requestARDTO) {
        return requestARService.createRequestAR(requestARDTO);
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable String id) {
        Optional<Notification> notificationOpt = notificationService.acceptNotification(id);
        if (notificationOpt.isPresent()) {
            return ResponseEntity.ok("Request accepted and message sent to user.");
        } else {
            return ResponseEntity.badRequest().body("Request not found or could not be accepted.");
        }
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable String id) {
        Optional<Notification> notificationOpt = notificationService.rejectNotification(id);
        if (notificationOpt.isPresent()) {
            return ResponseEntity.ok("Request rejected and message sent to user.");
        } else {
            return ResponseEntity.badRequest().body("Request not found or could not be rejected.");
        }
    }
}
