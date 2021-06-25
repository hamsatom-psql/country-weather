package org.restcountries.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class RestCountriesConfig {

    @Bean("restCountriesClient")
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://restcountries.eu/rest/v2")
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
