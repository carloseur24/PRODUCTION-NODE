require('dotenv').config();
const axios = require('axios')
const {
    readInput,
    inquirerMenu,
    stop,
    lintingPlaces
} = require("./helpers/inquirer")
const Searches = require('./model/searches')

// console.log (process.env.MAPBOX_KEY);

const main = async () => {
    const searches = new Searches();

    let opt;
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                // show a message to enter a place
                const term = await readInput('Enter a city: ');
                // Searching a place
                const places = await searches.city(term)
                // Selecting this place
                const id = await lintingPlaces(places);
                if (id === '0') continue;
                const place_Selected = places.find(l => l.id === id)
                //Recording in DB
                searches.addHistory(place_Selected.name)
                // Weather data in process
                const weather = await searches.weather(place_Selected.lat, place_Selected.lng)
                // Showing results
                console.clear()
                console.log(`\n How is Weather\n`.green);
                console.log('\n City: '.green, place_Selected.name);
                console.log('\n Lat: '.green, place_Selected.lat);
                console.log('\n Lng: '.green, place_Selected.lng);
                console.log('\n Temperature: '.green, weather.temp);
                console.log('\n Minimun: '.green, weather.min);
                console.log('\n Maximun: '.green, weather.max);
                console.log('\n Weather: '.green, weather.desc);
                break;
            case 2:
                if (searches.history.length!=0) {
                    console.log(`\nPleasure to see you again, You have records`.green)
                } else {
                        continue;
                }
                await stop()
                console.clear()
                console.log('\n')
                console.log('History'.green)
                console.log('\n')

                searches.historyCapitaliza.forEach((place, i) => {
                    const idx = `${i+1}. `.green
                    console.log(idx + place)
                })
                break;
        }
        if (opt !== 3) await stop();

    } while (opt !== 3)

}
main()