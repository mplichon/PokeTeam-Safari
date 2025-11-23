package poketeam.safari.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poketeam.safari.model.Pokemon;

public interface IDAOPokemon extends JpaRepository<Pokemon, Integer> {

}
