package poketeam.safari.dto.request;

import poketeam.safari.model.Inventaire;
import poketeam.safari.model.Joueur;

public class JoueurUpdateAsAdminRequest {

    private Integer id;
    private String username;
    private String surnom;
    private Inventaire inventaire;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public Inventaire getInventaire() {
        return inventaire;
    }

    public void setInventaire(Inventaire inventaire) {
        this.inventaire = inventaire;
    }


    public Joueur convert() {
        Joueur joueur = new Joueur();
        joueur.setId(id);
        joueur.setLogin(username);
        joueur.setSurnom(surnom);
        joueur.setInventaire(inventaire);
        return joueur;
    }
}
