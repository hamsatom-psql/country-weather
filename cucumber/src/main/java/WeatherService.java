import com.google.gson.Gson;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.StringJoiner;

public class WeatherService {
    private String baseUrl = "https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68";

    public WeatherService setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    }

    public OpenWeatherMapWeather fetchWeather(String city) throws IOException {
        return fetchWeather(city, null);
    }

    public OpenWeatherMapWeather fetchWeather(String city, String state) throws IOException {
        return fetchWeather(city, state, null);
    }

    public OpenWeatherMapWeather fetchWeather(String city, String state, String country) throws IOException {
        if (city == null || city.trim().isEmpty()) {
            throw new IllegalArgumentException("City not defined");
        }

        StringJoiner urlParams = new StringJoiner(",");
        urlParams.add(city);
        if (state != null && !state.trim().isEmpty()) {
            urlParams.add(state);
        }
        if (country != null && !country.trim().isEmpty()) {
            urlParams.add(country);
        }

        URL url = new URL(baseUrl + "&q=" + urlParams);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Accept", "application/json");

        try (BufferedReader responseReader = new BufferedReader(new InputStreamReader(new BufferedInputStream(connection.getInputStream())))) {
            return new Gson().fromJson(responseReader, OpenWeatherMapWeather.class);
        }
    }
}
