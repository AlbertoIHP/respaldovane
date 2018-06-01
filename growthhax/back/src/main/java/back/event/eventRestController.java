package back.event;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/event")
public class eventRestController {

    @Autowired
    private eventRepository eventRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<event> findAll() {
        return eventRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{eventId}")
    public event findOne(@PathVariable Long eventId) {
        return eventRepository.findOne(eventId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public event add(@RequestBody event event) {
        return eventRepository.save(event);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public event update(@RequestBody event event) {
        return eventRepository.save(event);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{eventId}")
    public void delete(@PathVariable Long eventId) {
        eventRepository.delete(eventId);
    }
	
}

