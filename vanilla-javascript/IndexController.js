class IndexController {
    constructor() {
        IndexController.populateValues()

        // Add event listeners
        IndexController.addBlurHandlerOnId(["city", "state", "country", "units"]);
        IndexController.addClickHandlerOnId(["show"]);
        IndexController.useInput();
    }

    static populateValues() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const id = localStorage.key(i)
            const element = document.getElementById(id)
            if (element) {
                element.value = localStorage.getItem(id)
            } else {
                localStorage.removeItem(id)
            }
        }
    }

    static fetchWeather(city, state, country, units, language) {
        let query = `&q=${city}`
        if (state) {
            query += `,${state}`
        }
        if (country) {
            query += `,${country}`
        }
        query += `&units=${units}`
        query += language ? `&lang=${language}` : ""
        return fetch(`https://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68${query}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
    }

    static addBlurHandlerOnId(ids) {
        IndexController.addHandlerOnId(IndexController.useInput, 'change', ids);
    }
    
    static addClickHandlerOnId(ids) {
            IndexController.addHandlerOnId(IndexController.useInput, 'click', ids);
        }

    static addHandlerOnId(func, event, ids) {
        ids.forEach(id => {
            const elem = document.getElementById(id);
            console.assert(elem != null, `Element not found for id ${id}`);
            elem.addEventListener(event, func);
        });
    }

    static useInput() {
        const city = IndexController.useTrimmedValue("city")
        const state = IndexController.useTrimmedValue("state")
        const country = IndexController.useTrimmedValue("country")
        const units = IndexController.useTrimmedValue("units")

        if (city) {
            IndexController.fetchWeather(city, state, country, units, navigator.language)
                .then(response => response.json())
                .then(json => IndexController.renderWeather(json.list))
        }
    }

    static useTrimmedValue(id) {
        const element = document.getElementById(id);
        const trimmedValue = element.value.trim();
        element.value = trimmedValue;
        try {
            localStorage.setItem(id, trimmedValue);
        } catch (e) {
            console.error(e);
        }
        return trimmedValue;
    }

    static renderWeather(weatherList) {
        if (weatherList) {
            const section = document.getElementById("weather")
            section.textContent = ''
            weatherList.forEach(weather => {
                const city = document.createElement("div");
                city.classList.add("city-weather");
                IndexController.addCondition(city, "", weather.sys.country ? `${weather.name}, ${weather.sys.country}` : weather.name, "div")
                IndexController.addCondition(city, "", weather.weather[0].description, "strong", weather.weather[0].icon)
                IndexController.addCondition(city, "Temperature ", `${weather.main.temp}°`)
                IndexController.addCondition(city, "Feels like ", `${weather.main.feels_like}°`)
                IndexController.addCondition(city, "Lowest temperature ", `${weather.main.temp_min}°`)
                IndexController.addCondition(city, "Highest temperature ", `${weather.main.temp_max}°`)
                IndexController.addCondition(city, "Humidity ", `${weather.main.humidity}%`)
                IndexController.addCondition(city, "Wind speed ", weather.wind.speed)
                section.appendChild(city)
            })
        }
    }

    static addCondition(section, name, value, element = "div", image = null) {
        if (value) {
            const condition = document.createElement(element);
            condition.innerText = `${name}${value}`
            condition.classList.add("weather-condition");
            section.appendChild(condition)

            if (image) {
                const img = document.createElement("img");
                img.src = `assets/${image}.png`
                img.style.height = "2.5rem";
                img.loading = "lazy";
                condition.appendChild(img)
            }
        }
    }
}
