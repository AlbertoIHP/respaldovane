package back.calendar;

import java.io.IOException;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

import back.upload.Aws3Upload;


@Entity
public class calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;
    private String name;

    @Size(min = 0, max = 255)  
    private String picture;



    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) throws IOException 
	{
		if( !picture.equals("http://www.free-printable-calendar.com/printable-calendars-images/april-2018-calendar.gif") )
		{
			Aws3Upload uploader = new Aws3Upload();
			System.out.println("GUARDANDOOOO IMAGEEEEENNN");		
			
			
			this.picture = uploader.uploadImageS3( picture );
			
			System.out.println("MOSTRANDO LA URL DE S3");
			System.out.println(this.picture);
			
		}
		else
		{
			this.picture = picture;
		}
	}

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
