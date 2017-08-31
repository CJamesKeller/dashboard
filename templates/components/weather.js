const html = require("choo/html")
const css = require("sheetify")
const forecast = require("./forecast")

const weatherStyle = css`
    :host {
        position: relative;
        border: 2px solid black;
    }

    :host>div {
        display: inline-block;
        padding: 10px;
        margin-top: 2px;
    }

    .forecast {
        margin-left: 50px;
    }
`

const currentStyle = css`
    :host {
        max-width: 20vw;
        vertical-align: top;
    }
`

const forecastStyle = css`
    :host {
        position: relative;
    }

    :host>div {
        display: inline-block;
        padding: 10px;
        border: 2px solid black;
        margin: 2px;
    }
`

weather = (state, emit) => {

    let placeholderDay = new Date()

    let current_weather = state.weatherNow || [{
        WeatherIcon: 10,
        WeatherText: "There is no data"
    }]

    let future_weather = state.weatherForecast || {
        Headline: {
            Text: "There is no data"
        },
        DailyForecasts: [{
            Date: placeholderDay,
            Day: {
                IconPhrase: "There is no data",
                Icon: 11
            },
            Night: {
                IconPhrase: "There is no data",
                Icon: 11
            }
        }]
    }

    let current_temp = current_weather[0].Temperature.Imperial.Value + "°" || "99°"

    let stringifiedWeatherIcon = current_weather[0].WeatherIcon.toString()
    let iconNum = stringifiedWeatherIcon.length

    if ( iconNum === 1 ) {
        stringifiedWeatherIcon = 0 + stringifiedWeatherIcon
    }

    return html`
        <div class=${weatherStyle}>
            <div class=${currentStyle}>
                <h2>Accuweather:</h2>
                <h3>${current_temp}, ${current_weather[0].WeatherText}</h3>
                <img src="https://developer.accuweather.com/sites/default/files/${stringifiedWeatherIcon}-s.png" />
                <p>${future_weather.Headline.Text}</p>
            </div>
            <div class="forecast">
                <h3>Forecast:</h3>
                <div class=${forecastStyle}>
                    ${future_weather.DailyForecasts.map(DayForecast => {
                        return html`
                            <div>
                                ${forecast(state, emit, DayForecast)}
                            </div>
                        `
                    })}
                </div>
            </div>
        </div>
    `
}

module.exports = weather
