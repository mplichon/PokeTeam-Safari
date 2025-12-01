package poketeam.safari.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Inventaire {

	@Column(name = "nb_pokeball", nullable = false, columnDefinition = "INT(3)")
	Integer nbPokeball;

	@Column(name = "nb_friandise", nullable = false, columnDefinition = "INT(3)")
	Integer nbFriandise;

	@Column(name = "nb_boue", nullable = false, columnDefinition = "INT(3)")
	Integer nbBoue;

	public Inventaire() {
	}

	public Inventaire(Integer nbPokeball, Integer nbFriandise, Integer nbBoue) {
		this.nbPokeball = nbPokeball;
		this.nbFriandise = nbFriandise;
		this.nbBoue = nbBoue;
	}

	public Integer getNbPokeball() {
		return nbPokeball;
	}

	public void setNbPokeball(Integer nbPokeball) {
		this.nbPokeball = nbPokeball;
	}

	public Integer getNbFriandise() {
		return nbFriandise;
	}

	public void setNbFriandise(Integer nbFriandise) {
		this.nbFriandise = nbFriandise;
	}

	public Integer getNbBoue() {
		return nbBoue;
	}

	public void setNbBoue(Integer nbBoue) {
		this.nbBoue = nbBoue;
	}

	@Override
	public String toString() {
		return "Inventaire [nbPokeball=" + nbPokeball + ", nbFriandise=" + nbFriandise + ", nbBoue=" + nbBoue + "]";
	}
}
