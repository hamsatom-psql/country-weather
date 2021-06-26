import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Weather} from "./weather";
import {Units} from "./units";


@Injectable({providedIn: 'root'})
export class WeatherService {

    httpOptions = {
        headers: new HttpHeaders({'Accept': 'application/json'})
    };
    private weatherMapUrl = 'https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68';  // URL to web api

    constructor(private http: HttpClient) {
    }

    getWeather(city: string, units: Units, state: string, country: string): Observable<Weather[]> {
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
        return this.http.get<Weather[]>(url, this.httpOptions).pipe(
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