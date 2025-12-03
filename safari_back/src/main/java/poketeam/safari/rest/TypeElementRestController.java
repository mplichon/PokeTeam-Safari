package poketeam.safari.rest;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poketeam.safari.dto.response.TypeElementResponse;
import poketeam.safari.model.TypeElement;

@RestController
@RequestMapping("/api/type")
@CrossOrigin("*")
public class TypeElementRestController {
    private static final Logger log = LoggerFactory.getLogger(TypeElementRestController.class);
    
    @GetMapping
    public List<TypeElementResponse> getAllTypes() {
        log.info("GET /api/type - getAllTypes() called");

        return Arrays.stream(TypeElement.values())
                .map(t -> new TypeElementResponse(t.name(), t.getNom(), t.getCouleur()))
                .toList();
    }
}
