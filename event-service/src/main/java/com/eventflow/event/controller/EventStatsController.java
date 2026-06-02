package com.eventflow.event.controller;

import com.eventflow.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/events/stats")
@RequiredArgsConstructor
public class EventStatsController {

    private final EventRepository eventRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalEvents = eventRepository.count();
        int totalAvailableTickets = eventRepository.findAll().stream()
                .mapToInt(e -> e.getAvailableTickets())
                .sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEvents", totalEvents);
        stats.put("totalAvailableTickets", totalAvailableTickets);
        return ResponseEntity.ok(stats);
    }
}
