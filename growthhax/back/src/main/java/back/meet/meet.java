package back.meet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;


@Entity
public class meet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;
    private String name;
    private String videoconference;
    private String pupil_id;
    private String hour;
    private String minutes;
    private String didhappen;
    private String isactive;
    private String invitator;
    
    
    @Size(min = 0, max = 255)
    private String session_tok_id;
    
    
    
    
    public String getSession_tok_id() {
		return session_tok_id;
	}

	public void setSession_tok_id(String session_tok_id) {
		this.session_tok_id = session_tok_id;
	}

	public String getInvitator() {
		return invitator;
	}

	public void setInvitator(String invitator) {
		this.invitator = invitator;
	}

	public String getDidhappen() {
		return didhappen;
	}

	public void setDidhappen(String didhappen) {
		this.didhappen = didhappen;
	}

	public String getIsactive() {
		return isactive;
	}

	public void setIsactive(String isactive) {
		this.isactive = isactive;
	}

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public String getMinutes() {
		return minutes;
	}

	public void setMinutes(String minutes) {
		this.minutes = minutes;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVideoconference() {
		return videoconference;
	}

	public void setVideoconference(String videoconference) {
		this.videoconference = videoconference;
	}

	public String getPupil_id() {
		return pupil_id;
	}

	public void setPupil_id(String pupil_id) {
		this.pupil_id = pupil_id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	private String date;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
