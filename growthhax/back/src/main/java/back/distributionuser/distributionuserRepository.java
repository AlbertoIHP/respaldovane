package back.distributionuser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface distributionuserRepository extends JpaRepository<distributionuser, Long> {
    //User findByUsername(String username);
}
