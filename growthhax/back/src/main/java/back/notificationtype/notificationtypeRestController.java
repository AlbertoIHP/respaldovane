package back.notificationtype;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/notificationtype")
public class notificationtypeRestController {

    @Autowired
    private notificationtypeRepository notificationtypeRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<notificationtype> findAll() {
        return notificationtypeRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{notificationtypeId}")
    public notificationtype findOne(@PathVariable Long notificationtypeId) {
        return notificationtypeRepository.findOne(notificationtypeId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public notificationtype add(@RequestBody notificationtype notificationtype) {
        return notificationtypeRepository.save(notificationtype);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public notificationtype update(@RequestBody notificationtype notificationtype) {
        return notificationtypeRepository.save(notificationtype);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{notificationtypeId}")
    public void delete(@PathVariable Long notificationtypeId) {
        notificationtypeRepository.delete(notificationtypeId);
    }
	
}

