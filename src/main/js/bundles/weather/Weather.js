class Weather {
    activate() {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=51.96&longitude=7.63&current_weather=true')
            .then((response) => response.json())
            .then((data) => {
                console.info("### Your weather service");
                console.info("### Muenster, Germany: " + data.current_weather.temperature + "°C");
                console.info("### -- Weather data by https://open-meteo.com/,"
                + " offered under the CC BY 4.0 license (https://creativecommons.org/licenses/by/4.0/)");
            })
            .catch((error) => console.info("Error requesting weather data: " + error));
    }
}

export {
    Weather
};
