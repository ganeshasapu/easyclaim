package com.easyclaim.EasyClaimBackend.UseCase;


import com.easyclaim.EasyClaimBackend.Entity.SimilarClaim;
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

import java.util.Objects;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class GetSimilarLifeIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    private static Gson g;

    @BeforeAll
    static void setup() {
        g = new Gson();
    }
    @Test
    void getSimilarLifeClaims_enterByClaimNumber_similarClaimsReturned() throws Exception {
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/get_similar_life/{claimNumber}", "352143")).andDo(print()).
                andExpect(status().isOk()).andExpect(content().contentType("application/json")).andReturn();

        SimilarClaim[] claims = g.fromJson(result.getResponse().getContentAsString(), SimilarClaim[].class);


        for (SimilarClaim claim: claims) {
            Assertions.assertNotNull(claim.getClaim());
            Assertions.assertTrue(Objects.equals(claim.getClaim().getStatus(), "Approved")
                    || Objects.equals(claim.getClaim().getStatus(), "Denied"));
        }

    }
}
