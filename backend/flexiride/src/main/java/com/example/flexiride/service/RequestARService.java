package com.example.flexiride.service;

import com.example.flexiride.dto.RequestARDTO;
import com.example.flexiride.model.RequestAR;
import com.example.flexiride.model.Notification;
import com.example.flexiride.repository.RequestARRepository;
import com.example.flexiride.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestARService {

    private final RequestARRepository requestARRepository;
    private final NotificationService notificationService;

    @Autowired
    public RequestARService(RequestARRepository requestARRepository, NotificationService notificationService) {
        this.requestARRepository = requestARRepository;
        this.notificationService = notificationService;
    }

    public List<RequestARDTO> getAllRequestARs() {
        List<RequestAR> requestARList = requestARRepository.findAll();
        return requestARList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RequestARDTO convertToDTO(RequestAR requestAR) {
        return new RequestARDTO(
                requestAR.getCost(),
                requestAR.getPickupDate(),
                requestAR.getPickupTime(),
                requestAR.getVehicleName(),
                requestAR.getRequestUsername(),
                requestAR.getVehicleOwnerUsername()
        );
    }

    private RequestAR convertToEntity(RequestARDTO requestARDTO) {
        RequestAR requestAR = new RequestAR();
        requestAR.setCost(requestARDTO.getCost());
        requestAR.setPickupDate(requestARDTO.getPickupDate());
        requestAR.setPickupTime(requestARDTO.getPickupTime());
        requestAR.setVehicleName(requestARDTO.getVehicleName());
        requestAR.setRequestUsername(requestARDTO.getRequestUsername());
        requestAR.setVehicleOwnerUsername(requestARDTO.getVehicleOwnerUsername());
        return requestAR;
    }

    public RequestARDTO createRequestAR(RequestARDTO requestARDTO) {
        RequestAR requestAR = convertToEntity(requestARDTO);
        RequestAR savedRequestAR = requestARRepository.save(requestAR);
        return convertToDTO(savedRequestAR);
    }

    public RequestARDTO sendRequestToVehicleOwner(RequestARDTO requestARDTO) {
        RequestAR requestAR = convertToEntity(requestARDTO);
        RequestAR savedRequestAR = requestARRepository.save(requestAR);

        Notification notification = new Notification();
        notification.setUserId(requestAR.getRequestUsername());
        notification.setVehicleOwnerId(requestAR.getVehicleOwnerUsername());
        notification.setType("Request Sent");
        notification.setMessage("Your request for vehicle " + requestAR.getVehicleName() + " has been sent to the owner.");
        notification.setStatus("unread");
        notification.setCost(requestAR.getCost().intValue());
        notification.setPickupDate(requestAR.getPickupDate());
        notification.setReturnDate(null);
        notification.setPickupTime(requestAR.getPickupTime());
        notification.setVehicleName(requestAR.getVehicleName());

        notificationService.saveNotification(notification);

        return convertToDTO(savedRequestAR);
    }
}
