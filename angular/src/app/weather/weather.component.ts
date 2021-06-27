import {Component, OnInit} from '@angular/core';
import {Weather} from "../weather";
import {WeatherService} from "../weather.service";
import {getTemperatureUnit, getUnits, getWindSpeedUnit, Units} from "../units";

@Component({
    selector: 'weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    city: string = localStorage.getItem("city") ?? ""
    units = [
        {name: "Metric units", value: Units.Metric},
        {name: "Imperial units", value: Units.Imperial}
    ];
    selectedUnit: Units = getUnits(localStorage.getItem("selectedUnit"));
    state: string = localStorage.getItem("state") ?? ""
    selectedCountry: string = localStorage.getItem("country") ?? ""
    countries: Set<string> = new Set<string>();
    weather: Weather[] = [];
    windSpeedUnit: string = getWindSpeedUnit(this.selectedUnit);
    temperatureUnit: string = getTemperatureUnit(this.selectedUnit);

    constructor(private weatherService: WeatherService) {
    }

    ngOnInit() {
        this.getWeather();
    }

    getWeather(): void {
        this.saveState();
        if (this.city) {
            this.weatherService.getWeather(this.city, this.selectedUnit, this.state, this.selectedCountry)
                .subscribe(weather => {
                    this.weather = weather
                    this.windSpeedUnit = getWindSpeedUnit(this.selectedUnit)
                    this.temperatureUnit = getTemperatureUnit(this.selectedUnit)
                    this.countries = new Set<string>(weather.map(w => w.country))
                    this.countries.add("")
                });
        }
    }

    private saveState(): void {
        this.city = this.city.trim();
        localStorage.setItem("city", this.city)
        localStorage.setItem("selectedUnit", this.selectedUnit)
        this.state = this.state.trim();
        localStorage.setItem("state", this.state)
        localStorage.setItem("country", this.selectedCountry)
    }
}


