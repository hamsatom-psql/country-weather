package org.restcountries.service;

import org.model.Country;
import org.model.CountryDetail;
import org.restcountries.model.RestCountriesCountry;
import org.service.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nonnull;

@Service("restCountriesService")
public class RestCountriesCountryService implements ICountryService {
    private final WebClient webClient;

    @Autowired
    public RestCountriesCountryService(@Qualifier("restCountriesClient") @Nonnull WebClient webClient) {
        this.webClient = webClient;
    }

    @Nonnull
    @Override
    public Flux<Country> fetchCountries() {
        return webClient.get()
                .uri("/all")
                .retrieve()
                .bodyToFlux(RestCountriesCountry.class)
                .map(RestCountriesCountry::toCountry);
    }

    @Nonnull
    @Override
    public Mono<CountryDetail> fetchCountryDetail(@Nonnull String countryName) {
        return webClient.get().uri("/name/" + countryName)
                .retrieve()
                .bodyToFlux(RestCountriesCountry.class)
                .singleOrEmpty()
                .map(RestCountriesCountry::toCountryDetail);
    }
}
