package back.distribution;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/distribution")
public class distributionRestController {

    @Autowired
    private distributionRepository distributionRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<distribution> findAll() {
        return distributionRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{distributionId}")
    public distribution findOne(@PathVariable Long distributionId) {
        return distributionRepository.findOne(distributionId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public distribution add(@RequestBody distribution distribution) {
        return distributionRepository.save(distribution);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public distribution update(@RequestBody distribution distribution) {
        return distributionRepository.save(distribution);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{distributionId}")
    public void delete(@PathVariable Long distributionId) {
        distributionRepository.delete(distributionId);
    }
	
}

