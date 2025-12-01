package poketeam.safari.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type_compte",columnDefinition = "enum('admin', 'joueur')")
public abstract class Compte {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
    protected int id;

	@Column(name="login", nullable = false, length = 20)
    protected String login;

	@Column(name="password", nullable = false, length = 150)
    protected String password;

    public Compte() {}

    public Compte(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public Compte(Integer id, String login, String password) {
    	this.id = id;
        this.login = login;
        this.password = password;
    }
    
    public boolean seConnecter(String login, String password) {
        if (this.login.equals(login) && this.password.equals(password)) {
            return true;
        }
        return false;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "Compte [id=" + id + ", login=" + login + "]";
    }
}
