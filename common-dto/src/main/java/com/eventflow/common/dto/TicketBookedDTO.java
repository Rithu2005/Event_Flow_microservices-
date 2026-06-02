package com.eventflow.common.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketBookedDTO {
    private Long bookingId;
    private Long eventId;
    private String userId;
    private Integer ticketCount;
    private Double totalPrice;
    private LocalDateTime bookingDate;
    private String status;
}
