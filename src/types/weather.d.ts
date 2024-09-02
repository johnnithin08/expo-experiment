type Coordinates = {
    lon: number;
    lat: number;
};

type Weather = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type MainWeather = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional because it may not always be present
    grnd_level?: number; // Optional because it may not always be present
};

type Wind = {
    speed: number;
    deg: number;
    gust?: number; // Optional because it may not always be present
};

type Rain = {
    "1h"?: number; // Optional because it may not always be present
};

type Clouds = {
    all: number;
};

type Sys = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

type TWeatherData = {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: Wind;
    rain?: Rain; // Optional because it may not always be present
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

type TWeatherForecast = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
        "3h": number;
    };
    sys: {
        pod: string;
    };
    dt_txt: string;
};
