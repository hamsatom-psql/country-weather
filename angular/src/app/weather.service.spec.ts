import {WeatherService} from "./weather.service";
import {OpenWeatherMapWeather} from "./open.weather.map.weather";
import {Units} from "./units";
import {of} from "rxjs";

describe('WeatherService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let heroService: WeatherService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        heroService = new WeatherService(httpClientSpy as any);
    });

    it('should return without state', (done: DoneFn) => {
        const expected: OpenWeatherMapWeather = {
            list: []
        };

        httpClientSpy.get.and.returnValue(of(expected));

        heroService.getWeather("city", Units.Metric, "", "country").subscribe({
            next: weather => {
                expect(weather).toEqual([]);
                done();
            },
            error: done.fail
        });

        expect(httpClientSpy.get.calls.argsFor(0)[0]).toEqual("https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68&q=city,country&units=metric&lang=en-GB");
    });

    it('should without state or country', (done: DoneFn) => {
        const expected: OpenWeatherMapWeather = {
            list: []
        };

        httpClientSpy.get.and.returnValue(of(expected));

        heroService.getWeather("city", Units.Metric, "", "").subscribe({
            next: weather => {
                expect(weather).toEqual([]);
                done();
            },
            error: done.fail
        });

        expect(httpClientSpy.get.calls.argsFor(0)[0]).toEqual("https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68&q=city&units=metric&lang=en-GB");
    });

    it('should with state and country', (done: DoneFn) => {
        const expected: OpenWeatherMapWeather = {
            list: []
        };

        httpClientSpy.get.and.returnValue(of(expected));

        heroService.getWeather("city", Units.Metric, "state", "country").subscribe({
            next: weather => {
                expect(weather).toEqual([]);
                done();
            },
            error: done.fail
        });

        expect(httpClientSpy.get.calls.argsFor(0)[0]).toEqual("https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68&q=city,state,country&units=metric&lang=en-GB");
    });

    it('should map from weather map to weather', (done: DoneFn) => {
        const expected: OpenWeatherMapWeather = {
            list: [{
                name: "Copenhagen",
                sys: {country: "DK"},
                main: {temp: 17.5, temp_max: 17.9, temp_min: 17.3, humidity: 50, feels_like: 17.2},
                wind: {speed: 3.2},
                weather: [{icon: "01d", description: "clear sky"}]
            }]
        };

        httpClientSpy.get.and.returnValue(of(expected));

        heroService.getWeather("city", Units.Metric, "", "").subscribe({
            next: weather => {
                expect(weather).toEqual([{
                    country: "DK",
                    humidity: 50,
                    description: "clear sky",
                    iconName: "01d",
                    place: "Copenhagen, DK",
                    temperature: 17.5,
                    temperatureFeel: 17.2,
                    temperatureMax: 17.9,
                    temperatureMin: 17.3,
                    windSpeed: 3.2,
                }]);
                done();
            },
            error: done.fail
        });
    });
});