package back.distribution;

import org.springframework.data.jpa.repository.JpaRepository;

public interface distributionRepository extends JpaRepository<distribution, Long> {
    //User findByUsername(String username);
}
