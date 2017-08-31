const html = require("choo/html")
const css = require("sheetify")

const celestialStyle = css`
    :host {
        position: relative;
        vertical-align: top;
    }

    h3 {
        margin-top: 0;
        margin-bottom: 0;
    }
`

celestial = (state, emit) => {

    let theSun = state.sun
    let theMoon = state.moon

    let sunrise = theSun.riseISO
    let sunset = theSun.setISO

    sunrise = sunrise.slice(11, 16)
    sunrise = sunrise.slice(1, (sunrise.length + 1))

    sunset = sunset.slice(11, 16)

    let hour = sunset.slice(0, 2)
    let minutes = sunset.slice(2, 5)
    sunset = (hour - 12) + minutes

    let lunar_phase = theMoon.phase.name

    return html`
        <div class="container ${celestialStyle}">
            <h3>Sunrise is at ${sunrise}</h3>
            <h3>Sunset is at ${sunset}</h3>
            <h3>The moon phase is ${lunar_phase}</h3>
        </div>
    `
}

module.exports = celestial
