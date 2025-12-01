package poketeam.safari.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAOTableApparition;
import poketeam.safari.model.TableApparition;

@Service
public class TableApparitionService {

    @Autowired
    private IDAOTableApparition daoTableApparition;

    public TableApparition save(TableApparition tableApparition) {
        return daoTableApparition.save(tableApparition);
    }
}
