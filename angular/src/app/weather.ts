export interface Weather {
    place: string;
    description: string;
    temperature: number;
    temperatureFeel: number;
    temperatureMin: number;
    temperatureMax: number;
    humidity: number;
    windSpeed: number;
    iconName: string;
}