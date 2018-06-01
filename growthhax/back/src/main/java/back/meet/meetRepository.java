package back.meet;

import org.springframework.data.jpa.repository.JpaRepository;

public interface meetRepository extends JpaRepository<meet, Long> {
    //User findByUsername(String username);
}
