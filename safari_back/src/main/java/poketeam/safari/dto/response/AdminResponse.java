package poketeam.safari.dto.response;

public class AdminResponse {
    private Integer id;
    private String login;
    private boolean admin;

    public AdminResponse(Integer id, String login) {
        this.id = id;
        this.login = login;
        this.admin = true;
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

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
