package back.calendar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/calendar")
public class calendarRestController {

    @Autowired
    private calendarRepository calendarRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<calendar> findAll() {
        return calendarRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{calendarId}")
    public calendar findOne(@PathVariable Long calendarId) {
        return calendarRepository.findOne(calendarId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public calendar add(@RequestBody calendar calendar) {
        return calendarRepository.save(calendar);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public calendar update(@RequestBody calendar calendar) {
        return calendarRepository.save(calendar);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{calendarId}")
    public void delete(@PathVariable Long calendarId) {
        calendarRepository.delete(calendarId);
    }
	
}

