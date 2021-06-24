package service;

import model.Country;
import model.CountryDetail;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nonnull;

public interface ICountryService {
    @Nonnull
    Flux<Country> fetchCountries();

    @Nonnull
    Mono<CountryDetail> fetchCountryDetail(@Nonnull Mono<String> countryName);
}
