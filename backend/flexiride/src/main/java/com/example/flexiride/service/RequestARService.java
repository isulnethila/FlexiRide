package com.example.flexiride.service;

import com.example.flexiride.dto.RequestARDTO;
import com.example.flexiride.model.RequestAR;
import com.example.flexiride.repository.RequestARRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestARService {

    private final RequestARRepository requestARRepository;

    @Autowired
    public RequestARService(RequestARRepository requestARRepository) {
        this.requestARRepository = requestARRepository;
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
}
