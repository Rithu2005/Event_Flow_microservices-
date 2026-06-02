package com.eventflow.notification.consumer;

import com.eventflow.common.dto.EventDTO;
import com.eventflow.common.dto.TicketBookedDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationConsumer {

    @KafkaListener(topics = "ticket-booked", groupId = "notification-group")
    public void listenTicketBooking(TicketBookedDTO ticketBookedDTO) {
        log.info("Notification received for ticket booking: {}", ticketBookedDTO);
        // Implement email/notification logic here
        System.out.println("Notification: User " + ticketBookedDTO.getUserId() + 
                           " booked " + ticketBookedDTO.getTicketCount() + 
                           " tickets for event " + ticketBookedDTO.getEventId());
    }

    @KafkaListener(topics = "event-created", groupId = "notification-group")
    public void listenEventCreation(EventDTO eventDTO) {
        log.info("Notification received for event creation: {}", eventDTO);
        // Implement email/notification logic here
        System.out.println("Notification: New event created: " + eventDTO.getTitle());
    }

    @KafkaListener(topics = "event-updated", groupId = "notification-group")
    public void listenEventUpdate(EventDTO eventDTO) {
        log.info("Notification received for event update: {}", eventDTO);
        // Implement email/notification logic here
        System.out.println("Notification: Event updated: " + eventDTO.getTitle() + 
                           ". Available tickets: " + eventDTO.getAvailableTickets());
    }
}
