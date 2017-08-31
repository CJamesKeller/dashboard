const html = require("choo/html")
const css = require("sheetify")

const spaceStyle = css`
    :host {
        margin-left: 50px;
    }

    :host>p {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 30px;
    }

    :host>h2 {
        margin: 0;
    }
`

space = (state, emit) => {

    let space = state.space
    space.number = " " + space.number + " "

    return html`
        <div class="space ${spaceStyle}">
            <h2>There are currently ${space.number} people in space:</h2>
            ${space.people.map(person => {
                return html`
                    <p><strong> * ${person.name}</strong></p>
                `
            })}
        </div>
    `
}

module.exports = space
