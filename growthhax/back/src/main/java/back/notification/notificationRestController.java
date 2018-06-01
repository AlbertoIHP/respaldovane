package back.notification;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/notification")
public class notificationRestController {

    @Autowired
    private notificationRepository notificationRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<notification> findAll() {
        return notificationRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{notificationId}")
    public notification findOne(@PathVariable Long notificationId) {
        return notificationRepository.findOne(notificationId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public notification add(@RequestBody notification notification) {
        return notificationRepository.save(notification);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public notification update(@RequestBody notification notification) {
        return notificationRepository.save(notification);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{notificationId}")
    public void delete(@PathVariable Long notificationId) {
        notificationRepository.delete(notificationId);
    }
	
}

