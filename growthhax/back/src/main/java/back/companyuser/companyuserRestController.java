package back.companyuser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/companyuser")
public class companyuserRestController {

    @Autowired
    private companyuserRepository companyuserRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<companyuser> findAll() {
        return companyuserRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{companyuserId}")
    public companyuser findOne(@PathVariable Long companyuserId) {
        return companyuserRepository.findOne(companyuserId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public companyuser add(@RequestBody companyuser companyuser) {
        return companyuserRepository.save(companyuser);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public companyuser update(@RequestBody companyuser companyuser) {
        return companyuserRepository.save(companyuser);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{companyuserId}")
    public void delete(@PathVariable Long companyuserId) {
        companyuserRepository.delete(companyuserId);
    }
	
}

