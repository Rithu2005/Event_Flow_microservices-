package com.eventflow.ticket.controller;

import com.eventflow.ticket.entity.Booking;
import com.eventflow.ticket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/book")
    public ResponseEntity<Booking> bookTicket(@RequestBody Booking booking) {
        return ResponseEntity.ok(ticketService.bookTicket(booking));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookings(@PathVariable String userId) {
        return ResponseEntity.ok(ticketService.getBookingsByUser(userId));
    }
}
