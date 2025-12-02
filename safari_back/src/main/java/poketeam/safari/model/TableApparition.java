package poketeam.safari.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TableApparition {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idTableApparition;
    Integer idPokemon;
    Integer idMap;

    public TableApparition() {}

    public TableApparition(Integer idTableApparition, Integer idPokemon, Integer idMap) {
        this.idTableApparition = idTableApparition;
        this.idPokemon = idPokemon;
        this.idMap = idMap;
    }

    public TableApparition(Integer idPokemon, Integer idMap) {
        this.idPokemon = idPokemon;
        this.idMap = idMap;
    }

    public Integer getIdTableApparition() {
        return idTableApparition;
    }

    public Integer getIdPokemon() {
        return idPokemon;
    }

    public Integer getIdMap() {
        return idMap;
    }

    public void setIdTableApparition(Integer idTableApparition) {
        this.idTableApparition = idTableApparition;
    }

    public void setIdPokemon(Integer idPokemon) {
        this.idPokemon = idPokemon;
    }

    public void setIdMap(Integer idMap) {
        this.idMap = idMap;
    }
}

