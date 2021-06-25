package org.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiParam;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.io.Serializable;

public class CountryDetail extends Country implements Serializable {
    private static final long serialVersionUID = 6930240223388800366L;
    private String capital;
    @ApiParam(required = true)
    private long population;
    @JsonProperty("flag_file_url")
    @ApiParam(name = "flag_file_url")
    private String flagFileUrl;

    @Nullable
    public String getCapital() {
        return capital;
    }

    @Nonnull
    public CountryDetail setCapital(@Nullable String capital) {
        this.capital = capital;
        return this;
    }

    public long getPopulation() {
        return population;
    }

    @Nonnull
    public CountryDetail setPopulation(long population) {
        this.population = population;
        return this;
    }

    @Nullable
    public String getFlagFileUrl() {
        return flagFileUrl;
    }

    @Nonnull
    public CountryDetail setFlagFileUrl(@Nullable String flagFileUrl) {
        this.flagFileUrl = flagFileUrl;
        return this;
    }
}
