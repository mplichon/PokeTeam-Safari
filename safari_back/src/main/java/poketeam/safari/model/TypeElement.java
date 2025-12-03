package poketeam.safari.model;

public enum TypeElement {
	ACIER("Acier", "#60A2B9"),
	COMBAT("Combat", "#FF8100"),
	DRAGON("Dragon", "#4F60E2"),
	EAU("Eau", "#2481EF"),
	ELECTRIK("Électrik", "#FAC100"),
	FEE("Fée", "#EF70EF"),
	FEU("Feu", "#E72324"),
	GLACE("Glace", "#3DD9FF"),
	INSECTE("Insecte", "#92A212"),
	NORMAL("Normal", "#A0A2A0"),
	PLANTE("Plante", "#3DA224"),
	POISON("Poison", "#923FCC"),
	PSY("Psy", "#EF3F7A"),
	ROCHE("Roche", "#B0AA82"),
	SOL("Sol", "#B0AA82"),
	SPECTRE("Spectre", "#703F70"),
	TENEBRES("Ténèbres", "#4F3F3D"),
	VOL("Vol", "#82BAEF");
	
	private final String nom;
	private final String couleur;
	
	
	// Constructeur
	private TypeElement(String nom, String couleur) {
		this.nom = nom;
		this.couleur = couleur;
	}
	
	// Getter
	public String getNom() {
        return nom;
    }
	
	public String getCouleur() {
        return couleur;
    }
	
}
