package back.meet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import back.mailing.Mailing;
import back.pupil.pupil;
import back.pupil.pupilRepository;
import back.security.config.WebSecurityConfig;
import back.security.model.User;
import back.security.repository.UserRepository;



@RestController
@RequestMapping("/meet")
public class meetRestController {

    @Autowired
    private meetRepository meetRepository;
    

    
    
    @RequestMapping(method = RequestMethod.GET)
    public List<meet> findAll() {
        return meetRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{meetId}")
    public meet findOne(@PathVariable Long meetId) {
        return meetRepository.findOne(meetId);
    }
    
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(method = RequestMethod.POST)
    public meet add(@RequestBody meet meet) 
	{
		meet newMeet = meetRepository.save(meet);
		pupilRepository pupilBD = (pupilRepository) WebSecurityConfig.contextProvider().getApplicationContext().getBean("pupilRepository");
		UserRepository userBD = (UserRepository) WebSecurityConfig.contextProvider().getApplicationContext().getBean("userRepository");
		
		//First we receive the id of the pupil relation and the id of the invitator
		String invitatorId = newMeet.getInvitator();
		String pupilId = newMeet.getPupil_id();
		String invitatedId;
		
		System.out.println("InvitatorId:"+invitatorId);
		System.out.println("pupilId:"+pupilId);
		System.out.println("pupilID in Long format: "+Long.valueOf(pupilId));

		
		//With the pupil relation we can filter who is the invited 
		pupil pupilRelation = pupilBD.findOne(Long.valueOf(pupilId));		
		if( pupilRelation.getUser_id().equals( invitatorId ) )
		{
			invitatedId = pupilRelation.getUser_id1();
		}
		else
		{
			invitatedId = pupilRelation.getUser_id();
		}
		
		System.out.println("invitatedId: "+invitatedId);
		
		
		//With that clear, now we can consult for the complete object of the invitator and the invitated
		User invitator = userBD.findOne( Long.valueOf( invitatorId ) );
		User invitated = userBD.findOne( Long.valueOf( invitatedId ) );
		
		System.out.println("InvitatorMAIL: "+invitator.getUsername());
		System.out.println("invitatedMAIL: "+invitated.getUsername());
		
		
		
		//Recognize the emails of them
		String invitatorEmail = invitator.getUsername();
		String invitatedEmail = invitated.getUsername();

		//We build two messages, one for the invitator and the other one for the invitated
		String textForInvitator = "Dear user, you have created an meeting request for the day "+meet.getDate()+" at the "+meet.getHour()+":"+meet.getMinutes()+", please consider to assist it, and if you can not assist try to contact to your mentor";
		String textForInvited = "Dear user, you have been invited an meeting request for the day "+meet.getDate()+" at the "+meet.getHour()+":"+meet.getMinutes()+", please consider to assist it, and if you can not assist try to contact to your mentor";
		
		//Build also a subject for our email, and put there the invitator and the invited emails
		String subjectInvitator = "You have created a new meeting request for "+invitated.getUsername();
		String subjectInvited = "New meeting request from "+invitator.getUsername();
		
		//Now we can create a new mailing system
		Mailing mailingSystem = new Mailing();
		
		//And as everything is ready, we can send both emails
		mailingSystem.sendMessage(invitatorEmail, textForInvitator, subjectInvitator);
		mailingSystem.sendMessage(invitatedEmail, textForInvited, subjectInvited);
		
		
		
        return newMeet;
    }
	
	
	
	
	
	
	
	

	@RequestMapping(method = RequestMethod.PUT)
    public meet update(@RequestBody meet meet) {
        return meetRepository.save(meet);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{meetId}")
    public void delete(@PathVariable Long meetId) {
        meetRepository.delete(meetId);
    }
	
}

