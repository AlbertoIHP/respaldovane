package back.pupil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/pupil")
public class pupilRestController {

    @Autowired
    private pupilRepository pupilRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<pupil> findAll() {
        return pupilRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{pupilId}")
    public pupil findOne(@PathVariable Long pupilId) {
        return pupilRepository.findOne(pupilId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public pupil add(@RequestBody pupil pupil) {
        return pupilRepository.save(pupil);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public pupil update(@RequestBody pupil pupil) {
        return pupilRepository.save(pupil);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{pupilId}")
    public void delete(@PathVariable Long pupilId) {
        pupilRepository.delete(pupilId);
    }
	
}

