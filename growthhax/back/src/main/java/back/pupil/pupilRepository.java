package back.pupil;

import org.springframework.data.jpa.repository.JpaRepository;

public interface pupilRepository extends JpaRepository<pupil, Long> 
{
    //User findByUsername(String username);
}
