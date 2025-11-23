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
	@Column(name="type")
	TypeElement firstType;
	
	@Enumerated(EnumType.STRING)
	@Column(name="type2")
	TypeElement secondType;


	public Pokemon() {}
	
	public Pokemon(Integer id, String nom, int tauxCapture, int facteurApparition, String firstType) {
		this.id = id;
		this.nom = nom;
		this.tauxCapture = tauxCapture;
		this.facteurApparition = facteurApparition;
		this.firstType = TypeElement.valueOf(firstType);
		this.secondType = null;
	}
	
	
	
	public Pokemon(Integer id, String nom, int tauxCapture, int facteurApparition, String firstType, String secondType) {
		this.id = id;
		this.nom = nom;
		this.tauxCapture = tauxCapture;
		this.facteurApparition = facteurApparition;
		this.firstType = TypeElement.valueOf(firstType);;
		this.secondType = TypeElement.valueOf(secondType);;
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


	public TypeElement getFirstType() {
		return firstType;
	}


	public void setFirstType(TypeElement firstType) {
		this.firstType = firstType;
	}


	public TypeElement getSecondType() {
		return secondType;
	}


	public void setSecondType(TypeElement secondType) {
		this.secondType = secondType;
	}


	@Override
	public String toString() {
		return "Pokemon [id=" + id + ", nom=" + nom + ", tauxCapture=" + tauxCapture + ", facteurApparition="
				+ facteurApparition + ", firstType=" + firstType + ", secondType=" + secondType + "]";
	}
	
	


}
