package com.eventflow.common.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private LocalDateTime dateTime;
    private String location;
    private String bannerImageUrl;
    private Double price;
    private Integer totalCapacity;
    private Integer availableTickets;
    private String organizerId;
}
