package poketeam.safari.dto.response;


public class JoueurResponse {
    
    private Integer id;
    private String username;
    private String surnom;

    public JoueurResponse(Integer id, String username, String surnom) {
        this.id = id;
        this.username = username;
        this.surnom = surnom;
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

    public void setUsername(String login) {
        this.username = username;
    }

    public String getSurnom() {
        return surnom;
    }

    public void setSurnom(String surnom) {
        this.surnom = surnom;
    }
}
