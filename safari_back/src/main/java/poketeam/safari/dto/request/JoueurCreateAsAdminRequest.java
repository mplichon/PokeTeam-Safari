package poketeam.safari.dto.request;

import poketeam.safari.model.Inventaire;
import poketeam.safari.model.Joueur;

public class JoueurCreateAsAdminRequest {
    private String username;
    private String password;
    private String surnom;
    private Inventaire inventaire;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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


    public Joueur convert() {
        Joueur joueur = new Joueur();
        joueur.setLogin(username);
        joueur.setPassword(password);
        joueur.setSurnom(surnom);
        joueur.setInventaire(inventaire);
        return joueur;
    }
}
