package poketeam.safari.dto.response;


public class JoueurResponse {
    
    private Integer id;
    private String login;
    private String surnom;

    public JoueurResponse(Integer id, String login, String surnom) {
        this.id = id;
        this.login = login;
        this.surnom = surnom;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }   

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSurnom() {
        return surnom;
    }

    public void setSurnom(String surnom) {
        this.surnom = surnom;
    }
}
