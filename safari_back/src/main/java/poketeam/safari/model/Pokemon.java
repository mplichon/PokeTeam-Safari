package poketeam.safari.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="pokemon")
public class Pokemon {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	Integer id;
	
	@Column(name="nom")
	String nom;
	
	@Column(name="taux_capture")
	int tauxCapture;
	
	@Column(name="facteur_apparition")
	int facteurApparition;
	
	@Enumerated(EnumType.STRING)
	@Column(name="type_1")
	TypeElement type1;
	
	@Enumerated(EnumType.STRING)
	@Column(name="type_2")
	TypeElement type2;


	public Pokemon() {}
	
	public Pokemon(Integer id, String nom, int tauxCapture, int facteurApparition, String type1) {
		this.id = id;
		this.nom = nom;
		this.tauxCapture = tauxCapture;
		this.facteurApparition = facteurApparition;
		this.type1 = TypeElement.valueOf(type1);
		this.type2 = null;
	}
	
	
	
	public Pokemon(Integer id, String nom, int tauxCapture, int facteurApparition, String type1, String type2) {
		this.id = id;
		this.nom = nom;
		this.tauxCapture = tauxCapture;
		this.facteurApparition = facteurApparition;
		this.type1 = TypeElement.valueOf(type1);;
		this.type2 = TypeElement.valueOf(type2);;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public int getTauxCapture() {
		return tauxCapture;
	}


	public void setTauxCapture(int tauxCapture) {
		this.tauxCapture = tauxCapture;
	}


	public int getFacteurApparition() {
		return facteurApparition;
	}


	public void setFacteurApparition(int facteurApparition) {
		this.facteurApparition = facteurApparition;
	}


	public TypeElement getType1() {
		return type1;
	}


	public void setType1(TypeElement type1) {
		this.type1 = type1;
	}


	public TypeElement getType2() {
		return type2;
	}


	public void setType2(TypeElement type2) {
		this.type2 = type2;
	}


	@Override
	public String toString() {
		return "Pokemon [id=" + id + ", nom=" + nom + ", tauxCapture=" + tauxCapture + ", facteurApparition="
				+ facteurApparition + ", type1=" + type1 + ", type2=" + type2 + "]";
	}
	
	


}
