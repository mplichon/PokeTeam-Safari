package poketeam.safari.dto.response;

import poketeam.safari.model.Inventaire;

public class JoueurResponse {
    
    private Integer id;
    private String username;
    private String surnom;
    private Inventaire inventaire;

    public JoueurResponse(Integer id, String username, String surnom, Integer nbPokeball, Integer nbFriandise, Integer nbBoue) {
        this.id = id;
        this.username = username;
        this.surnom = surnom;
        this.inventaire = new Inventaire(nbPokeball, nbFriandise, nbBoue);
    }

    public JoueurResponse(Integer id, String username, String surnom, Inventaire inventaire) {
        this.id = id;
        this.username = username;
        this.surnom = surnom;
        this.inventaire = inventaire;
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

    public Inventaire getInventaire() {
        return inventaire;
    }

    public void setInventaire(Inventaire inventaire) {
        this.inventaire = inventaire;
    }
    
}
