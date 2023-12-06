package com.easyclaim.EasyClaimBackend.UseCase;

import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.google.gson.Gson;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class ProcessLifeClaimIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    private static Gson g;

    @BeforeAll
    static void setup() {
        g = new Gson();
    }

    @Test
    void approveClaim_enterClaimNumber_claimApproved() throws Exception {
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/get_life/Current")).andDo(print()).
                andExpect(status().isOk()).andExpect(content().contentType("application/json")).andReturn();

        LifeClaim[] currentClaims = g.fromJson(result.getResponse().getContentAsString(), LifeClaim[].class);
        Assertions.assertTrue(currentClaims.length > 0);
        String claimNumber = currentClaims[0].getClaimNumber();

        this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/approve_life/{claimNumber}", claimNumber)).andDo(print()).
                andExpect(status().isOk());

    }

    @Test
    void denyClaim_enterClaimNumber_claimDenied() throws Exception {
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/get_life/Current")).andDo(print()).
                andExpect(status().isOk()).andExpect(content().contentType("application/json")).andReturn();

        LifeClaim[] currentClaims = g.fromJson(result.getResponse().getContentAsString(), LifeClaim[].class);
        Assertions.assertTrue(currentClaims.length > 0);
        String claimNumber = currentClaims[0].getClaimNumber();

        this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/deny_life/{claimNumber}", claimNumber)).andDo(print()).
                andExpect(status().isOk());
    }

}
