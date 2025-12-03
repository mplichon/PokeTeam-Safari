package poketeam.safari.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import poketeam.safari.dao.IDAOCompte;
import poketeam.safari.model.Compte;
import poketeam.safari.security.jwt.JwtUtils;
import poketeam.safari.dto.request.AuthUserRequest;
import poketeam.safari.dto.response.AuthResponse;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    @Autowired
    private AuthenticationManager am;

    @Autowired
    private IDAOCompte daoCompte;

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody AuthUserRequest request) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

        // On demande à Spring Security si le user / password sont OK
        Authentication result = this.am.authenticate(auth);

        Compte compte = daoCompte.findByLogin(request.getUsername()).orElseThrow();
        Integer idCompte = compte.getId();

        return new AuthResponse(JwtUtils.generate(result, idCompte));
    }

    @GetMapping("/test")
    public String test() {
        return "OK";
    }
}
