package back.message;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import back.distributionuser.distributionuser;
import back.distributionuser.distributionuserRepository;
import back.mailing.Mailing;
import back.pupil.pupilRepository;
import back.security.config.WebSecurityConfig;
import back.security.repository.UserRepository;


@RestController
@RequestMapping("/message")
public class messageRestController {

    @Autowired
    private messageRepository messageRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<message> findAll() {
        return messageRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{messageId}")
    public message findOne(@PathVariable Long messageId) {
        return messageRepository.findOne(messageId);
    }
	
	
	
	
	
    
	@RequestMapping(method = RequestMethod.POST)
    public message add(@RequestBody message message) 
	{
		message newMsg = messageRepository.save(message);
		
		System.out.println("Dsitribution ID:"+newMsg.getDistribution_id());
		
		//We check if the message comes with an distribution ID
		if( !newMsg.getDistribution_id().equals("") )
		{
			
			//We get the repositories that we are going to use to get the emails 
			distributionuserRepository disUserBD = (distributionuserRepository) WebSecurityConfig.contextProvider().getApplicationContext().getBean("distributionuserRepository");
			UserRepository userBD = (UserRepository) WebSecurityConfig.contextProvider().getApplicationContext().getBean("userRepository");
			
			
			//First we get the distribution ID to get fetch from distribution user all the users to send the email
			String distributionId = newMsg.getDistribution_id();			
			
			
			//We bring the whole list of relations
			List<distributionuser> disUserList = disUserBD.findAll();
			
			//We create a new list with for save the users ID's
			List<String> usersIds = new ArrayList<>();
			
			
			//We go throw the whole list and filter those that belongs to the distribution ID
			for( int i = 0 ; i < disUserList.size() ; i ++ )
			{
				//We check that the relation has the distribution ID and also is not the creator
				if( disUserList.get(i).getDistribution_id().equals(distributionId) && disUserList.get(i).getIsowner().equals("0") )
				{
					System.out.println("The user with this ID is going to be considerated for the email:"+disUserList.get(i).getUser_id() );
					usersIds.add( disUserList.get(i).getUser_id() );
				}
			}
			
			//Now we can create a new mailing system
			Mailing mailingSystem = new Mailing();
			String subject = "New message from an distribution list ";
			String content = newMsg.getContent();
			
			//Now we fetch by the user ID and send the email
			for( int i = 0 ; i < usersIds.size() ; i ++ )
			{
				//We get the email
				String invitatedEmail = userBD.findOne( Long.valueOf( usersIds.get(i) ) ).getUsername();
				System.out.println("Sending email for: "+invitatedEmail);
				mailingSystem.sendMessage(invitatedEmail, content, subject);				
				
			}		
			
		}
        

		
		
		return newMsg;
    }
	
	
	
	
	

	@RequestMapping(method = RequestMethod.PUT)
    public message update(@RequestBody message message) {
        return messageRepository.save(message);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{messageId}")
    public void delete(@PathVariable Long messageId) {
        messageRepository.delete(messageId);
    }
	
}

