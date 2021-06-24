package model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import javax.annotation.Nonnull;
import java.io.Serializable;

public class Country implements Serializable {
    private static final long serialVersionUID = 3167747680471117325L;
    @ApiModelProperty(required = true)
    private String name;
    @JsonProperty("country_code")
    @ApiModelProperty(required = true, name = "country_code")
    private String countryCode;

    @Nonnull
    public String getName() {
        return name;
    }

    @Nonnull
    public Country setName(@Nonnull String name) {
        this.name = name;
        return this;
    }

    @Nonnull
    public String getCountryCode() {
        return countryCode;
    }

    @Nonnull
    public Country setCountryCode(@Nonnull String countryCode) {
        this.countryCode = countryCode;
        return this;
    }
}
