
package poketeam.safari.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poketeam.safari.model.RencontrePokemon;

public interface IDAORencontrePokemon extends JpaRepository <RencontrePokemon, Integer> {
    
}