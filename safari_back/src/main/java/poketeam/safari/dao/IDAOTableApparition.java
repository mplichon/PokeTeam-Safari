package poketeam.safari.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poketeam.safari.model.TableApparition;

public interface IDAOTableApparition extends JpaRepository<TableApparition, Integer> {
    
}
