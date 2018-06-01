package back.experience;

import org.springframework.data.jpa.repository.JpaRepository;

public interface experienceRepository extends JpaRepository<experience, Long> {
    //User findByUsername(String username);
}
