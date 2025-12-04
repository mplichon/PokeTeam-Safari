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

@WebMvcTest(AdminRestController.class)
@EnableMethodSecurity(prePostEnabled = true)
public class AdminRestControllerTest {
    private static final int ADMIN_ID = 1;
    private static final String ADMIN_LOGIN = "login_test";
    private static final String ADMIN_PASSWORD = "password_test";
    private static final String API_URL = "/api/admin";

    @MockitoBean
    private CompteService compteSrv;

    @MockitoBean
    private JwtHeaderFilter jwtHeaderFilter;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldAllAdminsStatusUnauthorized() throws Exception {
        // given

        // when
        ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.get(API_URL));

        // then
        result.andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldAllAdminsStatusOk() throws Exception {
        // given

        // when
        ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.get(API_URL));

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());
    }

    // @Test
    // @WithMockUser
    // void shouldAllAdminsUseGetAllAdmins() throws Exception {
    //     // given

    //     // when
    //     this.mockMvc.perform(MockMvcRequestBuilders.get(API_URL));

    //     // then
    //     Mockito.verify(this.compteSrv).getAllAdmins();
    // }

    // @Test
    // @WithMockUser
    // void shouldAllAdminsReturnAttributes() throws Exception {
    //     // given
    //     Admin a1 = new Admin();

    //     a1.setId(1);
    //     a1.setLogin(ADMIN_LOGIN);
    //     a1.setPassword(ADMIN_PASSWORD);

    //     Mockito.when(this.compteSrv.getAllAdmins()).thenReturn(List.of(a1));

    //     // when
    //     ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.get(API_URL));

    //     // then
    //     result.andExpect(MockMvcResultMatchers.jsonPath("$[*].id").exists());
    //     result.andExpect(MockMvcResultMatchers.jsonPath("$[*].login").exists());
    //     result.andExpect(MockMvcResultMatchers.jsonPath("$[*].password").exists());
    // }
}
