const html = require("choo/html")
const css = require("sheetify")

const containerStyle = css`
    :host {
        display: inline-block;
        flex-direction: row;
        flex-wrap: wrap;
        border: 2px solid darkgrey;
        background-color: lightgrey;
        padding: 10px;
    }
`

const topNewsDiv = css`
    :host {
        text-align: center;
    }

    :host img {
        float: left;
    }

    :host h2 {
        position: relative;
    }
`

const contentStyle = css`
    :host {
        max-width: 34vw;
        border: 5px solid slategrey;
        padding: 5px;
        margin-bottom: 10px;
        background-color: white
    }

    a {
        color: black;
    }

    p {
        margin: 0;
    }

    .content {
        margin-top: 20px;
    }
`

article = (state, emit) => {

    let results = state.results
    let monthArray = [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    betterDate = (date) => {
        let mNum = date.slice(5, 7)
        if ( mNum[0] == "0" ) {
            mNum = mNum.slice(1)
        }
        let better_month = monthArray[mNum]
        let better_date = date.slice(8, 10)
        let better_year = date.slice(0, 4)
        let best_date = better_month + " " + better_date + ", " + better_year

        return best_date
    }

    return html`
        <div class=${containerStyle}>
            <div class=${topNewsDiv}>
                <img src="http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_30a.png" />
                <h2>Top Headlines:</h2>
            </div>
            ${results.map(result => {
                let image = result.multimedia[3] || result.multimedia[2] ||
                            result.multimedia[1] || result.multimedia[0] ||
                            {
                                url: "http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_30a.png",
                                caption: "[No image]",
                                copyright: "."
                            }

                return html`
                    <div class=${contentStyle}>
                        <h2><a href=${result.url}>${result.title}</a></h2>
                        <p><strong>${result.byline}</strong></p>
                        <p>${betterDate(result.created_date)}</p>
                        <div class="article_image">
                            <img src=${image.url} />
                            <p>${image.caption}</p>
                            <p><em>${image.copyright}</em></p>
                        </div>
                        <p class="content">${result.abstract}</p>
                    </div>
                `
            })}
        </div>
    `
}

module.exports = article
