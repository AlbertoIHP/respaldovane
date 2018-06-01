package back.chat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String user_id;
    private String user_id1;
    private String name;
    private String meet_id;
    
    
    
    
	public String getMeet_id() {
		return meet_id;
	}
	public void setMeet_id(String meet_id) {
		this.meet_id = meet_id;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_id1() {
		return user_id1;
	}
	public void setUser_id1(String user_id1) {
		this.user_id1 = user_id1;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}





}
