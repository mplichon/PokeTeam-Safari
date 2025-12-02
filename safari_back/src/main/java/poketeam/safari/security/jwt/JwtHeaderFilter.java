package poketeam.safari.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import poketeam.safari.dao.IDAOCompte;
import poketeam.safari.model.Admin;
import poketeam.safari.model.Compte;
import poketeam.safari.model.Joueur;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class JwtHeaderFilter extends OncePerRequestFilter{
    @Autowired
    private IDAOCompte daoCompte;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (request.getRequestURI().equals("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (header != null) {
            String token = header.substring(7); // On enlève "Bearer " pour garder que le jeton

            // On vérifie le jeton, et si tout est OK, on récupère l'utilisateur associé à ce jeton
            Optional<Integer> optId = JwtUtils.validateAndGetId(token);

            if (optId.isPresent()) {
                Integer id = optId.get();
                Compte compte = this.daoCompte.findById(id).orElseThrow();

                // On refabrique une liste de rôles pour l'utilisateur
                List<GrantedAuthority> autorities = new ArrayList<>();

                if (compte instanceof Joueur) {
                    autorities.add(new SimpleGrantedAuthority("ROLE_JOUEUR"));
                }

                else if (compte instanceof Admin) {
                    autorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                }

                // Créer, pour Spring Security, un nouvel User, avec le nom d'utilisateur, pas de mdp, et la liste des autorités
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(compte.getLogin(), null, autorities);

                // Injecter notre nouvel authentication dans le contexte de Spring Security
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Important pour chainer sur le filtre suivant
        filterChain.doFilter(request, response);
    }
}
