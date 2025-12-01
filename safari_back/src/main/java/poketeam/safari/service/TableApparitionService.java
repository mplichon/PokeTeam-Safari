package poketeam.safari.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAOTableApparition;
import poketeam.safari.model.TableApparition;

@Service
public class TableApparitionService {

    @Autowired
    private IDAOTableApparition daoTableApparition;

    public int tableSize() {
        return (int) daoTableApparition.count();
    }

    public List<TableApparition> getAll() {
        return daoTableApparition.findAll();
    }

    public TableApparition getById(Integer id) {
        return daoTableApparition.findById(id).orElse(null);
    }

    public TableApparition save(TableApparition tableApparition) {
        return daoTableApparition.save(tableApparition);
    }
    public void deleteAll() {
        daoTableApparition.deleteAll();
    }
}
