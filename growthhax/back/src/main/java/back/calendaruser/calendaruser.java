package back.calendaruser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class calendaruser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String user_id;
    private String calendar_id;
    private String isowner;


    public String getIsowner() {
		return isowner;
	}

	public void setIsowner(String isowner) {
		this.isowner = isowner;
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

	public String getCalendar_id() {
		return calendar_id;
	}

	public void setCalendar_id(String calendar_id) {
		this.calendar_id = calendar_id;
	}




}
