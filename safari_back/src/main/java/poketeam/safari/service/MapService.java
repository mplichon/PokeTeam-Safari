package poketeam.safari.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAOMap;
import poketeam.safari.model.Map;

@Service
public class MapService {

    @Autowired
    IDAOMap daoMap;

    public Map getById(Integer id) {
        Optional<Map> opt = daoMap.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            return opt.get();
        }
    }

    public List<Map> getAll() {
        return daoMap
                .findAll();
    }

    public Map creatOrUpdateMap(Map map) {
        return daoMap.save(map);
    }

    public void deleteById(Integer id) {
        daoMap.deleteById(id);
    }

    public void delete(Map map) {
        daoMap.delete(map);
    }
}
