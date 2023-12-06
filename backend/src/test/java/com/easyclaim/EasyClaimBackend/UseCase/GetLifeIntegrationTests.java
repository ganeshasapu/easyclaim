package com.easyclaim.EasyClaimBackend.UseCase;


import com.easyclaim.EasyClaimBackend.Entity.LifeClaim;
import com.fasterxml.jackson.databind.ObjectMapper;
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
public class GetLifeIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    static void setup() {
        mapper = new ObjectMapper();
    }


    @Test
    void getLifeClaim_receiveClaimFromDB_matchingClaimNumbers() throws Exception {
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/get_life/claim/{claimNumber}", "352143")).andDo(print()).
                andExpect(status().isOk()).andExpect(content().contentType("application/json")).andReturn();


        LifeClaim claim = mapper.readValue(result.getResponse().getContentAsString(), LifeClaim.class);

        Assertions.assertEquals(claim.getClaimNumber(), "352143");

    }

    @Test
    void getLifeClaims_receiveCurrentClaimsFromDB_allCurrentClaimsReturned() throws Exception {
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/get_life/{type}", "Current")).andDo(print()).
                andExpect(status().isOk()).andExpect(content().contentType("application/json")).andReturn();

        LifeClaim[] claims = mapper.readValue(result.getResponse().getContentAsString(), LifeClaim[].class);

        for (LifeClaim claim: claims) {
            Assertions.assertEquals(claim.getStatus(), "Recieved");
        }
    }

    @Test
    void getLifeClaims_receiveHistoricalClaimsFromDB_allHistoricalClaimsReturned() throws Exception {
        MvcResult result = this.mockMvc.perform(MockMvcRequestBuilders.
                        get("/api/get_life/{type}", "Historical")).andDo(print()).
                andExpect(status().isOk()).andExpect(content().contentType("application/json")).andReturn();

        LifeClaim[] claims = mapper.readValue(result.getResponse().getContentAsString(), LifeClaim[].class);

        for (LifeClaim claim: claims) {
            Assertions.assertTrue(Objects.equals(claim.getStatus(), "Approved")
                    || Objects.equals(claim.getStatus(), "Denied"));
        }
    }



}
