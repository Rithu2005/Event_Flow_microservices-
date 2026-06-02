package com.eventflow.event.service;

import com.eventflow.common.dto.EventDTO;
import com.eventflow.event.entity.Event;
import com.eventflow.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event createEvent(Event event) {
        event.setAvailableTickets(event.getTotalCapacity());
        Event savedEvent = eventRepository.save(event);
        
        // Notify other services about event creation
        kafkaTemplate.send("event-created", mapToDTO(savedEvent));
        
        return savedEvent;
    }

    public void updateAvailableTickets(Long eventId, int count) {
        Event event = getEventById(eventId);
        if (event.getAvailableTickets() < count) {
            throw new RuntimeException("Not enough tickets available");
        }
        event.setAvailableTickets(event.getAvailableTickets() - count);
        eventRepository.save(event);
        
        // Notify other services about event update
        kafkaTemplate.send("event-updated", mapToDTO(event));
    }

    private EventDTO mapToDTO(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .category(event.getCategory())
                .dateTime(event.getDateTime())
                .location(event.getLocation())
                .bannerImageUrl(event.getBannerImageUrl())
                .price(event.getPrice())
                .totalCapacity(event.getTotalCapacity())
                .availableTickets(event.getAvailableTickets())
                .organizerId(event.getOrganizerId())
                .build();
    }
}
