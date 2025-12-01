package poketeam.safari.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import poketeam.safari.security.jwt.JwtUtils;
import poketeam.safari.dto.request.AuthUserRequest;
import poketeam.safari.dto.response.AuthResponse;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    @Autowired
    private AuthenticationManager am;

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody AuthUserRequest request) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

        // On demande à Spring Security si le user / password sont OK
        this.am.authenticate(auth);

        System.out.println("test");

        return new AuthResponse(JwtUtils.generate(auth));
    }

    @GetMapping("/test")
    public String test() {
        return "OK";
    }
}
