package poketeam.safari.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@DiscriminatorValue("joueur")
public class Joueur extends Compte {
	
	
	@Column(name="nickname",nullable = false,length = 15)
	private String surnom;
	
	@ManyToOne
	@JoinColumn(name = "map_id")
	private Map positionActuelle;

	//a preciser
	private transient List<Pokemon> pokedex = new ArrayList();
	
	
	public Joueur(String login, String password, String surnom) {
		super(login, password);
		this.surnom = surnom;
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

	@Override
	public String toString() {
		return "Joueur [id=" + id + ", surnom=" + surnom + "]";
	}

}
