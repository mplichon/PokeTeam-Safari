package poketeam.safari.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import poketeam.safari.dao.IDAOCompte;
import poketeam.safari.model.Admin;
import poketeam.safari.model.Compte;
import poketeam.safari.model.Joueur;

import java.util.function.Function;

@Service
public class JpaUserDetailsService implements UserDetailsService {
    @Autowired
    private IDAOCompte dao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Function<Compte, String> roleMapper = (person) -> {
            return switch (person) {
                case Joueur j    -> "JOUEUR";
                case Admin a    -> "ADMIN";
                default             -> "NONE";
            };
        };

        return this.dao.findByLogin(username)
                .map(person -> User
                        .withUsername(username)
                        .password(person.getPassword())
                        .roles(roleMapper.apply(person))
                        .build()
                )
                .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                ;
    }
}
