package com.eventflow.ticket.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "event-service")
public interface EventClient {
    @PutMapping("/api/v1/events/{id}/tickets")
    void updateTickets(@PathVariable("id") Long id, @RequestParam("count") int count);
}
