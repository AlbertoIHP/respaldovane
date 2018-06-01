package back.calendaruser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/calendaruser")
public class calendaruserRestController {

    @Autowired
    private calendaruserRepository calendaruserRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<calendaruser> findAll() {
        return calendaruserRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{calendaruserId}")
    public calendaruser findOne(@PathVariable Long calendaruserId) {
        return calendaruserRepository.findOne(calendaruserId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public calendaruser add(@RequestBody calendaruser calendaruser) {
        return calendaruserRepository.save(calendaruser);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public calendaruser update(@RequestBody calendaruser calendaruser) {
        return calendaruserRepository.save(calendaruser);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{calendaruserId}")
    public void delete(@PathVariable Long calendaruserId) {
        calendaruserRepository.delete(calendaruserId);
    }
	
}

