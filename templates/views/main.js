const html = require("choo/html")
const css = require("sheetify")
const celestial = require("../components/celestial")
const space = require("../components/space")
const weather = require("../components/weather")
const article = require("../components/article")

const peopleStyle = css`
    :host {
        position: relative;
    }

    :host>div {
        display: inline-block;
        padding: 10px;
    }
`

render = (state, emit) => {

    return html`
        <div id="overallContainer">
            <h1>Here's What's Comin A'Choo</h1>
            <div class="${peopleStyle}">
                ${celestial(state, emit)}
                ${space(state, emit)}
            </div>
            <div>
                ${weather(state, emit)}
            </div>
            <hr />
            <div>
                ${article(state, emit)}
            </div>
        </div>
    `
}

module.exports = render
