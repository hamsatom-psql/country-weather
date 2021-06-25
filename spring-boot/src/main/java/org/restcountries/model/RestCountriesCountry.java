package org.restcountries.model;

import org.model.Country;
import org.model.CountryDetail;

import javax.annotation.Nonnull;
import java.io.Serializable;

public class RestCountriesCountry implements Serializable {
    private static final long serialVersionUID = -2122312732193113660L;
    private String name;
    private String capital;
    private String flag;
    private long population;
    private String alpha2Code;

    public Country toCountry() {
        return new Country()
                .setCountryCode(alpha2Code)
                .setName(name);
    }

    public CountryDetail toCountryDetail() {
        CountryDetail countryDetail = new CountryDetail();
        countryDetail.setCapital(capital)
                .setPopulation(population)
                .setFlagFileUrl(flag)
                .setCountryCode(alpha2Code)
                .setName(name);
        return countryDetail;
    }

    @Nonnull
    public String getName() {
        return name;
    }

    @Nonnull
    public RestCountriesCountry setName(@Nonnull String name) {
        this.name = name;
        return this;
    }

    @Nonnull
    public String getCapital() {
        return capital;
    }

    @Nonnull
    public RestCountriesCountry setCapital(@Nonnull String capital) {
        this.capital = capital;
        return this;
    }

    @Nonnull
    public String getFlag() {
        return flag;
    }

    @Nonnull
    public RestCountriesCountry setFlag(@Nonnull String flag) {
        this.flag = flag;
        return this;
    }

    public long getPopulation() {
        return population;
    }

    @Nonnull
    public RestCountriesCountry setPopulation(long population) {
        this.population = population;
        return this;
    }

    @Nonnull
    public String getAlpha2Code() {
        return alpha2Code;
    }

    @Nonnull
    public RestCountriesCountry setAlpha2Code(@Nonnull String alpha2Code) {
        this.alpha2Code = alpha2Code;
        return this;
    }
}
