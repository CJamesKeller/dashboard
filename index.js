const choo = require("choo")
const app = choo()
const http = require("xhr")
const API_KEY = require("./config.json")
let main

app.use(function(state, emitter) {

    // NEWS
    news_promise = () => {
        return new Promise((resolve, reject) => {
            http.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY.nytimes_key}`,
            function(error, response, body) {
                if ( error ) {
                    console.log("error: ", error)
                    reject(error)
                }
                else if ( body ) {
                    let theResults = JSON.parse(body)
                    state.results = theResults.results
                    resolve("news")
                }
            })
        })
    }
    // SPACE
    space_promise = () => {
        return new Promise((resolve, reject) => {
            http.get(`http://api.open-notify.org/astros.json`,
            function(error, response, body) {
                if ( error ) {
                    console.log("error: ", error)
                    reject(error)
                }
                else if ( body ) {
                    let theResults = JSON.parse(body)
                    state.space = theResults
                    resolve("space")
                }
            })
        })
    }
    // SUN & MOON
    sunmoon_promise = () => {
        return new Promise((resolve, reject) => {
            http.get(`http://api.aerisapi.com/sunmoon/minneapolis,mn?client_id=${API_KEY.aeris_id}&client_secret=${API_KEY.aeris_key}`,
            function(error, response, body) {
                if ( error ) {
                    console.log("error: ", error)
                    reject(error)
                }
                else if ( body ) {
                    let theResults = JSON.parse(body)
                    state.sun = theResults.response[0].sun
                    state.moon = theResults.response[0].moon
                    resolve("sunmoon")
                }
            })
        })
    }
    // WEATHER
    weather_promise = () => {
        return new Promise((resolve, reject) => {

            location_promise = () => {
                return new Promise((resolve, reject) => {
                    http.get(`http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=${API_KEY.weather_key}&q=44.965860%2C-93.269578&language=en-us&details=false&toplevel=true`,
                    function(error, response, body) {
                        if ( error ) {
                            console.log("error: ", error)
                            reject(error)
                        }
                        else if ( body ) {
                            let location = JSON.parse(body)
                            let theLocation = location
                            resolve(theLocation)
                        }
                    })
                })
            }
            location_promise()
            .then((response) => {

                // FORECAST
                forecast_promise = (theLocation) => {
                    return new Promise((resolve, reject) => {
                        http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${theLocation.Key}?apikey=${API_KEY.weather_key}&language=en-us&details=false&metric=false`,
                        function(error, response, body) {
                            if ( error ) {
                                console.log("error: ", error)
                                reject(error)
                            }
                            else if ( body ) {
                                let theResults = JSON.parse(body)
                                resolve(theResults)
                            }
                        })
                    })
                }
                forecast_promise(response)
                .then((response) => {
                    state.weatherForecast = response
                }, (error) => {
                    console.log("error: ", error)
                })

                // CURRENT
                current_promise = (theLocation) => {
                    return new Promise((resolve, reject) => {
                        http.get(`http://dataservice.accuweather.com/currentconditions/v1/${theLocation.Key}?apikey=${API_KEY.weather_key}&language=en-us&details=false`,
                        function(error, response, body) {
                            if ( error ) {
                                console.log("error: ", error)
                                reject(error)
                            }
                            else if ( body ) {
                                let theResults = JSON.parse(body)
                                resolve(theResults)
                            }
                        })
                    })
                }
                current_promise(response)
                .then((response) => {
                    state.weatherNow = response
                }, (error) => {
                    console.log("error: ", error)
                })

            Promise.all([forecast_promise(response), current_promise(response)])
            .then(() => {
                resolve("weather")
            })

            }, (error) => {
                console.log("error: ", error)
                reject(error)
            })
        })
    }

    // ALL --> RENDER
    let whisper = Promise.all([news_promise(), space_promise(), sunmoon_promise(), weather_promise()])
    whisper.then(setTimeout(function() {
        main = require("./templates/views/main")
        app.route("/", main)
        app.mount("div")
        emitter.emit("render")
    }, 1500))

})
