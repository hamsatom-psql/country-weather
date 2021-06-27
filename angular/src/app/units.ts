export enum Units {
    Metric = "metric",
    Imperial = "imperial",
}

export function getUnits(unit: string | null | undefined): Units {
    if (unit) {
        const normalized = unit.toLowerCase().trim();
        switch (normalized) {
            case "metric":
                return Units.Metric
            case "imperial":
                return Units.Imperial
        }
    }
    return Units.Metric
}

export function getWindSpeedUnit(unit: Units): string {
    switch (unit) {
        case Units.Imperial:
            return "mi/h";
        case Units.Metric:
            return "m/s";
        default:
            throw new Error("Unknown unit " + unit);
    }
}

export function getTemperatureUnit(unit: Units): string {
    switch (unit) {
        case Units.Imperial:
            return "°F";
        case Units.Metric:
            return "°C";
        default:
            throw new Error("Unknown unit " + unit);
    }
}