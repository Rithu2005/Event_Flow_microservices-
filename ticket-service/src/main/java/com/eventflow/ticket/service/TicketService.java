package com.eventflow.ticket.service;

import com.eventflow.common.dto.TicketBookedDTO;
import com.eventflow.ticket.client.EventClient;
import com.eventflow.ticket.entity.Booking;
import com.eventflow.ticket.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketService {

    private final BookingRepository bookingRepository;
    private final EventClient eventClient;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Transactional
    public Booking bookTicket(Booking booking) {
        log.info("Processing booking for event: {} by user: {}", booking.getEventId(), booking.getUserId());
        
        // Ensure userId is set from security context if missing
        if (booking.getUserId() == null || booking.getUserId().isEmpty()) {
            String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            booking.setUserId(currentUserEmail);
        }

        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("CONFIRMED");
        
        // 1. Update event tickets via Feign (This also validates event existence and capacity)
        try {
            eventClient.updateTickets(booking.getEventId(), booking.getTicketCount());
        } catch (Exception e) {
            log.error("Failed to update tickets in Event Service: {}", e.getMessage());
            throw new RuntimeException("Booking failed: Could not update event capacity. " + e.getMessage());
        }
        
        // 2. Save booking
        Booking savedBooking = bookingRepository.save(booking);
        
        // 3. Publish event to Kafka
        try {
            kafkaTemplate.send("ticket-booked", mapToDTO(savedBooking));
        } catch (Exception e) {
            log.error("Failed to send Kafka message: {}", e.getMessage());
        }
        
        return savedBooking;
    }

    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    private TicketBookedDTO mapToDTO(Booking booking) {
        return TicketBookedDTO.builder()
                .bookingId(booking.getId())
                .eventId(booking.getEventId())
                .userId(booking.getUserId())
                .ticketCount(booking.getTicketCount())
                .totalPrice(booking.getTotalPrice())
                .bookingDate(booking.getBookingDate())
                .status(booking.getStatus())
                .build();
    }
}
