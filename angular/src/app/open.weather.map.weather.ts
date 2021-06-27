export interface OpenWeatherMapWeather {
    list: OpenWeatherCity[];
}

interface OpenWeatherCity {
    name: string;
    main: Main;
    sys: Sys;
    wind: Wind;
    weather: Weather[]
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

interface Wind {
    speed: number;
}

interface Weather {
    description: string;
    icon: string;
}

interface Sys {
    country: string;
}
