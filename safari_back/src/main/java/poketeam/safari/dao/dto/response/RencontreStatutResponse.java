package poketeam.safari.dao.dto.response;

public class RencontreStatutResponse {
    
    private String statut;

    public RencontreStatutResponse(String statut) {
        this.statut = statut;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String toJSON() {
        return "{ \"statut\" : \"" + statut + "\" }";
    }
}
