package poketeam.safari.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class RencontrePokemon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
	private Pokemon pokemon;
	private int tauxFuiteMod;
	private int tauxCaptureMod;
	private boolean aFuit;
	private boolean estCapture;

	public RencontrePokemon() {}

	public RencontrePokemon(Pokemon pokemon) {
		this.pokemon = pokemon;
		tauxFuiteMod = 0;
		tauxCaptureMod = 0;
		this.aFuit = false;
		this.estCapture = false;
	}

	public RencontrePokemon(Integer id, Pokemon pokemon, int tauxFuiteMod, int tauxCaptureMod, boolean aFuit,
			boolean estCapture) {
		this.id = id;
		this.pokemon = pokemon;
		this.tauxFuiteMod = tauxFuiteMod;
		this.tauxCaptureMod = tauxCaptureMod;
		this.aFuit = aFuit;
		this.estCapture = estCapture;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public Pokemon getPokemon() {
		return pokemon;
	}

	public void setPokemon(Pokemon pokemon) {
		this.pokemon = pokemon;
	}

	public int getTauxFuiteMod() {
		return tauxFuiteMod;
	}

	public void setTauxFuiteMod(int tauxFuiteMod) {
		this.tauxFuiteMod = tauxFuiteMod;
	}

	public int getTauxCaptureMod() {
		return tauxCaptureMod;
	}

	public void setTauxCaptureMod(int tauxCaptureMod) {
		this.tauxCaptureMod = tauxCaptureMod;
	}

	public boolean isaFuit() {
		return aFuit;
	}

	public void setaFuit(boolean aFuit) {
		this.aFuit = aFuit;
	}

	public boolean isEstCapture() {
		return estCapture;
	}

	public void setEstCapture(boolean estCapture) {
		this.estCapture = estCapture;
	}
}
