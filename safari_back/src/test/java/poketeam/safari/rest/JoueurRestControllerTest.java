package poketeam.safari.rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import poketeam.safari.security.jwt.JwtHeaderFilter;
import poketeam.safari.service.CompteService;

@WebMvcTest(JoueurRestController.class)
@EnableMethodSecurity(prePostEnabled = true)
public class JoueurRestControllerTest {
    private static final String API_URL = "/api/joueur";

    @MockitoBean
    private CompteService compteSrv;

    @MockitoBean
    private JwtHeaderFilter jwtHeaderFilter;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldAllJoueursStatusUnauthorized() throws Exception {
        // given

        // when
        ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.get(API_URL));

        // then
        result.andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldAllJoueursStatusOk() throws Exception {
        // given

        // when
        ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.get(API_URL));

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());
    }
}
