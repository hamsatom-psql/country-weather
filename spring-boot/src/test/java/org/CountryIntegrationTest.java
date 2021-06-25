package org;

import org.controller.CountryController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.model.Country;
import org.model.CountryDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CountryIntegrationTest {

    @Autowired
    CountryController countryController;

    @Test
    void getCountries() {
        Country finland = countryController.getCountries()
                .filter(country -> "FI".equals(country.getCountryCode()))
                .singleOrEmpty().block();
        Assertions.assertNotNull(finland);
        Assertions.assertEquals("Finland", finland.getName());
        Assertions.assertEquals("FI", finland.getCountryCode());
    }

    @Test
    void getCountryDetail() {
        CountryDetail finland = countryController.getCountryDetail("Finland").block();
        Assertions.assertNotNull(finland);
        Assertions.assertEquals("Finland", finland.getName());
        Assertions.assertEquals("FI", finland.getCountryCode());
        Assertions.assertEquals("Helsinki", finland.getCapital());
        Assertions.assertEquals("https://restcountries.eu/data/fin.svg", finland.getFlagFileUrl());
        Assertions.assertTrue(finland.getPopulation() > 0);
    }
}
