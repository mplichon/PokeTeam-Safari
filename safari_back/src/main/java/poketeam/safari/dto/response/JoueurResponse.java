package poketeam.safari.dto.response;

public class JoueurResponse {
    
    private Integer id;
    private String username;
    private String surnom;
    private Integer nbPokeball;
	private Integer nbFriandise;
	private Integer nbBoue;

    public JoueurResponse(Integer id, String username, String surnom, Integer nbPokeball, Integer nbFriandise, Integer nbBoue) {
        this.id = id;
        this.username = username;
        this.surnom = surnom;
        this.nbPokeball = nbPokeball;
        this.nbFriandise = nbFriandise;
        this.nbBoue = nbBoue;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }   

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSurnom() {
        return surnom;
    }

    public void setSurnom(String surnom) {
        this.surnom = surnom;
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
}
