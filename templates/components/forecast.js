const html = require("choo/html")
const css = require("sheetify")

forecast = (state, emit, DayForecast) => {

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let day = new Date(DayForecast.Date)
    let dayName = day.getDay()
    dayName = days[dayName]

    let highTemp = DayForecast.Temperature.Maximum.Value + "°" || "99°"
    let lowTemp = DayForecast.Temperature.Minimum.Value + "°" || "99°"

    stringify = (iconNum) => {
        let iconString = iconNum.toString()

        if ( iconString.length === 1 ) {
            iconString = 0 + iconString
        }
        return iconString
    }

    return html`
        <div>
            <h3>${dayName}</h3>
            <p>High of ${highTemp}</p>
            <p>${DayForecast.Day.IconPhrase}</p>
            <img src="https://developer.accuweather.com/sites/default/files/${stringify(DayForecast.Day.Icon)}-s.png" />
            <p>Low of ${lowTemp}</p>
            <p>${DayForecast.Night.IconPhrase}</p>
            <img src="https://developer.accuweather.com/sites/default/files/${stringify(DayForecast.Night.Icon)}-s.png" />
        </div>
    `
}

module.exports = forecast
