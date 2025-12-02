package poketeam.safari.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("joueur")
public class Joueur extends Compte {
	
	
	@Column(name="surnom",length = 20)
	private String surnom;
	
	@Embedded
	private Inventaire inventaire;

	@ManyToOne
	@JoinColumn(name = "id_map")
	private Map positionActuelle;

	@OneToMany(mappedBy = "joueur")
	private List<PokemonCapture> pokemonsCaptures = new ArrayList<PokemonCapture>();
	
	
	public Joueur(String login, String password, String surnom) {
		super(login, password);
		this.surnom = surnom;
		this.inventaire = new Inventaire(999, 999, 999);
	}
	
	public Joueur(Integer id, String login, String password, String surnom) {
		super(id, login, password);
		this.surnom = surnom;
	}

	public Joueur() {}


	public String getSurnom() {
		return surnom;
	}

	public void setSurnom(String surnom) {
		this.surnom = surnom;
	}

	public Map getPositionActuelle() {
		return positionActuelle;
	}

	public void setPositionActuelle(Map positionActuelle) {
		this.positionActuelle = positionActuelle;
	}


    public Inventaire getInventaire() {
        return inventaire;
    }

    public void setInventaire(Inventaire inventaire) {
        this.inventaire = inventaire;
    }

	@Override
	public String toString() {
		return "Joueur [id=" + id + ", surnom=" + surnom + "]";
	}

}
