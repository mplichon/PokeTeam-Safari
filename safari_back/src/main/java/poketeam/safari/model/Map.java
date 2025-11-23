package poketeam.safari.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Map {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name="nom_maps",nullable = false,length = 50)	
	private String nom;
	@Column(name="lien_maps",nullable = false,length = 50)	
	private String lien_img;
	
	
	public Map(String nom, String lien_img) {
		this.nom = nom;
		this.lien_img = lien_img;
	}

	public Map(Integer id, String nom, String lien_img) {
		this.id = id;
		this.nom = nom;
		this.lien_img = lien_img;
	}
	
	public Map() {}

	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getLien_img() {
		return lien_img;
	}


	public void setLien_img(String lien_img) {
		this.lien_img = lien_img;
	}


	@Override
	public String toString() {
		return "Map [nom=" + nom + ", lien_img=" + lien_img + "]";
	}
	
	
	
	
	
}
