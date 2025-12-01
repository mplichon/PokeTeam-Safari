package poketeam.safari.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poketeam.safari.model.Map;
import poketeam.safari.service.MapService;

@RestController
@RequestMapping("/api/map")
@CrossOrigin("*")
public class MapRestController {

    @Autowired
    private MapService mapService;

    @GetMapping
    public List<Map> getAllMap() {
        return mapService.getAll();
    }

    @GetMapping("/{id}")
    public Map getMapById(@PathVariable Integer id) {
        return mapService.getById(id);
    }

    @PostMapping
    public Map createMap(@RequestBody Map map) {
        return mapService.creatOrUpdateMap(map);
    }

    @PutMapping("/{id}")
    public Map updateMap(@PathVariable Integer id, @RequestBody Map map) {
        map.setId(id);
        return mapService.creatOrUpdateMap(map);
    }

    @DeleteMapping("/{id}")
    public void deleteMap(@PathVariable Integer id) {
        mapService.deleteById(id);
    }

}
