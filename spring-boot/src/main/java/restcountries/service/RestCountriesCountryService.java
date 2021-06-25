package restcountries.service;

import model.Country;
import model.CountryDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import restcountries.model.RestCountriesCountry;
import service.ICountryService;

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
    public Mono<CountryDetail> fetchCountryDetail(@Nonnull Mono<String> countryName) {
        return countryName.as(name -> webClient.get().uri("/name/" + name))
                .retrieve()
                .bodyToMono(RestCountriesCountry.class)
                .map(RestCountriesCountry::toCountryDetail);
    }
}
