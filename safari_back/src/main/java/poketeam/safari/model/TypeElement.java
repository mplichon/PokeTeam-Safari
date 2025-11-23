package poketeam.safari.model;

public enum TypeElement {
	ACIER("Acier"),
	COMBAT("Combat"),
	DRAGON("Dragon"),
	EAU("Eau"),
	ELECTRIK("Électrik"),
	FEE("Fée"),
	FEU("Feu"),
	GLACE("Glace"),
	INSECTE("Insecte"),
	NORMAL("Normal"),
	PLANTE("Plante"),
	POISON("Poison"),
	PSY("Psy"),
	ROCHE("Roche"),
	SOL("Sol"),
	SPECTRE("Spectre"),
	TENEBRES("Ténèbres"),
	VOL("Vol");
	
	private final String nom;
	
	
	// Constructeur
	private TypeElement(String nom) {
		this.nom = nom;
	}
	
	// Getter
	public String getNom() {
        return nom;
    }
	
	
}
