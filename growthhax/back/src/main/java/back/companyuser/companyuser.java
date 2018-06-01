package back.companyuser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class companyuser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String user_id;
    private String user_id1;
    private String isowner;



    public String getIsowner() {
		return isowner;
	}

	public void setIsowner(String isowner) {
		this.isowner = isowner;
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

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
