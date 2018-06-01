package back.notification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface notificationRepository extends JpaRepository<notification, Long> {
    //User findByUsername(String username);
}
