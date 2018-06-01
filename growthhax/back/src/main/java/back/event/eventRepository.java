package back.event;

import org.springframework.data.jpa.repository.JpaRepository;

public interface eventRepository extends JpaRepository<event, Long> {
    //User findByUsername(String username);
}
