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
	@Column(name="nom",nullable = false,length = 30)
	private String nom;
	@Column(name="lien_image",nullable = false,length = 50)
	private String lienImage;

	
	
	public Map(String nom, String lienImage) {
		this.nom = nom;
		this.lienImage = lienImage;
	}

	public Map(Integer id, String nom, String lienImage) {
		this.id = id;
		this.nom = nom;
		this.lienImage = lienImage;
	}
	
	public Map() {}

	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getLienImage() {
		return lienImage;
	}


	public void setLienImage(String lienImage) {
		this.lienImage = lienImage;
	}


	@Override
	public String toString() {
		return "Map [nom=" + nom + ", lienImage=" + lienImage + "]";
	}
	
	
	
	
	
}
