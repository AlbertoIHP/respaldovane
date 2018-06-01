package back.calendar;

import org.springframework.data.jpa.repository.JpaRepository;

public interface calendarRepository extends JpaRepository<calendar, Long> {
    //User findByUsername(String username);
}
