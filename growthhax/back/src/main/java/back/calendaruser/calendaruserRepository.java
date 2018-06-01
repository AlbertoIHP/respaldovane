package back.calendaruser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface calendaruserRepository extends JpaRepository<calendaruser, Long> {
    //User findByUsername(String username);
}
