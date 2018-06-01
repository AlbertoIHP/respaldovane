package back.chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface chatRepository extends JpaRepository<chat, Long> {
    //User findByUsername(String username);
}
