package back.notificationtype;

import org.springframework.data.jpa.repository.JpaRepository;

public interface notificationtypeRepository extends JpaRepository<notificationtype, Long> {
    //User findByUsername(String username);
}
