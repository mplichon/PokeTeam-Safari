package poketeam.safari.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("admin")
public class Admin extends Compte {

    public Admin() {}
	
    public Admin(String login, String password) {
        super(login, password);
    }

    public void ajouterMap() {
        
    }

    public void ajouterPokemon() {
        
    }
}
