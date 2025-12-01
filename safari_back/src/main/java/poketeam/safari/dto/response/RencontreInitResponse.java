package poketeam.safari.dto.response;

public class RencontreInitResponse {
     private Integer idRencontre;
     private Integer idPokemon;
     private String nomPokemon;
    
    public RencontreInitResponse(Integer idRencontre, Integer idPokemon, String nomPokemon) {
        this.idRencontre = idRencontre;
        this.idPokemon = idPokemon;
        this.nomPokemon = nomPokemon;
    }
    
    public Integer getIdRencontre() {
        return idRencontre;
    }
    public void setIdRencontre(Integer idRencontre) {
        this.idRencontre = idRencontre;
    }
    public Integer getIdPokemon() {
        return idPokemon;
    }
    public void setIdPokemon(Integer idPokemon) {
        this.idPokemon = idPokemon;
    }
    public String getNomPokemon() {
        return nomPokemon;
    }
    public void setNomPokemon(String nomPokemon) {
        this.nomPokemon = nomPokemon;
    }
}
