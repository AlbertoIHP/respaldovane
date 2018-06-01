package back.distributionuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/distributionuser")
public class distributionuserRestController {

    @Autowired
    private distributionuserRepository distributionuserRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<distributionuser> findAll() {
        return distributionuserRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{distributionuserId}")
    public distributionuser findOne(@PathVariable Long distributionuserId) {
        return distributionuserRepository.findOne(distributionuserId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public distributionuser add(@RequestBody distributionuser distributionuser) {
        return distributionuserRepository.save(distributionuser);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public distributionuser update(@RequestBody distributionuser distributionuser) {
        return distributionuserRepository.save(distributionuser);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{distributionuserId}")
    public void delete(@PathVariable Long distributionuserId) {
        distributionuserRepository.delete(distributionuserId);
    }
	
}

