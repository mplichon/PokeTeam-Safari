package poketeam.safari.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PokemonCapture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "id_joueur", nullable = false)
	private Joueur joueur;
	
	@ManyToOne
	@JoinColumn(name = "id_pokemon", nullable = false)
	private Pokemon pokemon;
	
	
	// Constructeurs
	public PokemonCapture() {}
	
	public PokemonCapture(Joueur joueur, Pokemon pokemon) {
		this.joueur = joueur;
		this.pokemon = pokemon;
	}
	
	public PokemonCapture(Integer id, Joueur joueur, Pokemon pokemon) {
		this.id = id;
		this.joueur = joueur;
		this.pokemon = pokemon;
	}

	
	// Getters et setters
	public Joueur getJoueur() {
		return joueur;
	}

	public void setJoueur(Joueur joueur) {
		this.joueur = joueur;
	}

	public Pokemon getPokemon() {
		return pokemon;
	}

	public void setPokemon(Pokemon pokemon) {
		this.pokemon = pokemon;
	}


	// toString
	
	@Override
	public String toString() {
		return "PokemonCapture [joueur=" + joueur.getSurnom() + ", pokemon=" + pokemon.getNom() + "]";
	}

}

