import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Weather} from "./weather";
import {OpenWeatherMapWeather} from "./open.weather.map.weather";


@Injectable({providedIn: 'root'})
export class WeatherService {

    httpOptions = {
        headers: new HttpHeaders({'Accept': 'application/json'})
    };
    private weatherMapUrl = 'https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68';  // URL to web api

    constructor(private http: HttpClient) {
    }

    getWeather(city: string, units: string, state: string, country: string): Observable<Weather[]> {
        let query = `&q=${city}`
        if (state) {
            query += `,${state}`
            if (country) {
                query += `,${country}`
            }
        }
        query += `&units=${units}`
        query += navigator.language ? `&lang=${navigator.language}` : ""
        const url = `${this.weatherMapUrl}${query}`;
        return this.http.get<OpenWeatherMapWeather>(url, this.httpOptions).pipe(
            map((openWeather: OpenWeatherMapWeather) => openWeather.list.map(city => {
                const weather: Weather = {
                    description: city.weather[0].description,
                    humidity: city.main.humidity,
                    temperature: city.main.temp,
                    temperatureFeel: city.main.feels_like,
                    temperatureMax: city.main.temp_max,
                    temperatureMin: city.main.temp_min,
                    place: city.sys.country ? `${city.name}, ${city.sys.country}` : city.name,
                    windSpeed: city.wind.speed,
                    iconName: city.weather[0].icon,
                }
                return weather;
            })),
            catchError(this.handleError<Weather[]>(`getWeather ${query}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(`${operation}: ${error}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}