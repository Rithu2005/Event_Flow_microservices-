package com.eventflow.ticket.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;
    private String userId;
    private Integer ticketCount;
    private Double totalPrice;
    private LocalDateTime bookingDate;
    private String status; // CONFIRMED, CANCELLED
}
