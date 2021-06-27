import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.junit.platform.engine.Cucumber;
import org.junit.jupiter.api.Assertions;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@Cucumber
public class WeatherInACityTest {
    private String city;
    private String country;
    private OpenWeatherMapWeather weather;

    @Given("city name is {string}")
    public void cityNameIs(String cityName) {
        city = cityName;
    }

    @And("country code is {string}")
    public void countryCodeIs(String countryCode) {
        country = countryCode;
    }

    @And("country code is not specified")
    public void country_code_is_not_specified() {
        country = null;
    }

    @When("I ask about weather in that place")
    public void iAskABoutWeatherInThatPlace() throws IOException {
        weather = new WeatherService().fetchWeather(city, null, country);
    }

    @Then("I should get no weather")
    public void i_should_get_no_weather() {
        Assertions.assertTrue(weather.getList().isEmpty());
    }

    @Then("the weather should be in city {string}")
    public void theWeatherShouldBeInCity(String cityName) {
        Assertions.assertEquals(cityName, weather.getList().get(0).getName());
    }

    @And("country should be {string}")
    public void countryShouldBe(String countryCode) {
        Assertions.assertEquals(countryCode, weather.getList().get(0).getSys().getCountry());
    }

    @And("place id should be {string}")
    public void placeIdShouldBe(String id) {
        Assertions.assertEquals(id, weather.getList().get(0).getId());
    }

    @Then("I should get multiple weather details")
    public void i_should_get_multiple_weather_details() {
        Assertions.assertTrue(weather.getList().size() > 0);
    }

    @And("with different countries")
    public void with_different_countries() {
        Set<String> countries = weather.getList().stream()
                .map(cityWeather -> cityWeather.getSys().getCountry())
                .collect(Collectors.toSet());
        Assertions.assertTrue(countries.size() > 0);
    }
}
