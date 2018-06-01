package back.companyuser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface companyuserRepository extends JpaRepository<companyuser, Long> {
    //User findByUsername(String username);
}
