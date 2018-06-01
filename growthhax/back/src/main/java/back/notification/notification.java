package back.notification;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String notificationtype_id;
    
    private String user_id;
    
    private String content;


    public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getNotificationtype_id() {
		return notificationtype_id;
	}

	public void setNotificationtype_id(String notificationtype_id) {
		this.notificationtype_id = notificationtype_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}




}
