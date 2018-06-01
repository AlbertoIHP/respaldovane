package back.experience;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/experience")
public class experienceRestController {

    @Autowired
    private experienceRepository experienceRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<experience> findAll() {
        return experienceRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{experienceId}")
    public experience findOne(@PathVariable Long experienceId) {
        return experienceRepository.findOne(experienceId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public experience add(@RequestBody experience experience) {
        return experienceRepository.save(experience);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public experience update(@RequestBody experience experience) {
        return experienceRepository.save(experience);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{experienceId}")
    public void delete(@PathVariable Long experienceId) {
        experienceRepository.delete(experienceId);
    }
	
}

