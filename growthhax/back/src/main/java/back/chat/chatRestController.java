package back.chat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/chat")
public class chatRestController {

    @Autowired
    private chatRepository chatRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<chat> findAll() {
        return chatRepository.findAll();
    }
    
	@RequestMapping(method = RequestMethod.GET, value = "/{chatId}")
    public chat findOne(@PathVariable Long chatId) {
        return chatRepository.findOne(chatId);
    }
    
	@RequestMapping(method = RequestMethod.POST)
    public chat add(@RequestBody chat chat) {
        return chatRepository.save(chat);
    }

	@RequestMapping(method = RequestMethod.PUT)
    public chat update(@RequestBody chat chat) {
        return chatRepository.save(chat);
    }
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{chatId}")
    public void delete(@PathVariable Long chatId) {
        chatRepository.delete(chatId);
    }
	
}

