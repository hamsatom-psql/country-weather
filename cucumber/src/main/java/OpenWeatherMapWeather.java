import java.util.List;

public class OpenWeatherMapWeather {
    private List<CityWeather> list;

    public List<CityWeather> getList() {
        return list;
    }

    public OpenWeatherMapWeather setList(List<CityWeather> list) {
        this.list = list;
        return this;
    }

    public static class CityWeather {
        private String id;
        private String name;
        private Sys sys;

        public String getId() {
            return id;
        }

        public CityWeather setId(String id) {
            this.id = id;
            return this;
        }

        public String getName() {
            return name;
        }

        public CityWeather setName(String name) {
            this.name = name;
            return this;
        }

        public Sys getSys() {
            return sys;
        }

        public CityWeather setSys(Sys sys) {
            this.sys = sys;
            return this;
        }
    }

    public static class Sys {
        private String country;

        public String getCountry() {
            return country;
        }

        public Sys setCountry(String country) {
            this.country = country;
            return this;
        }
    }
}