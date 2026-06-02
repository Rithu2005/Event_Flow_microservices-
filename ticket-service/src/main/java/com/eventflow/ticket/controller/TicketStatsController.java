package com.eventflow.ticket.controller;

import com.eventflow.ticket.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tickets/stats")
@RequiredArgsConstructor
public class TicketStatsController {

    private final BookingRepository bookingRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalBookings = bookingRepository.count();
        double totalRevenue = bookingRepository.findAll().stream()
                .mapToDouble(b -> b.getTotalPrice())
                .sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings", totalBookings);
        stats.put("totalRevenue", totalRevenue);
        return ResponseEntity.ok(stats);
    }
}
