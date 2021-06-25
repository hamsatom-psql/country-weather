package org.controller;

import org.model.Country;
import org.model.CountryDetail;
import org.service.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nonnull;

@RestController
public class CountryController {
    private final ICountryService service;

    @Autowired
    public CountryController(@Qualifier("restCountriesService") @Nonnull ICountryService service) {
        this.service = service;
    }

    @GetMapping(path = "/countries")
    @Nonnull
    public Flux<Country> getCountries() {
        return service.fetchCountries();
    }

    @GetMapping(path = "/countries/{name}")
    @Nonnull
    public Mono<CountryDetail> getCountryDetail(@PathVariable @Nonnull String name) {
        return service.fetchCountryDetail(name);
    }
}
