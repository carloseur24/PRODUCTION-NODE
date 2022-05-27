const fs = require('fs')

const {
    default: axios
} = require("axios");
const {
    info, Console
} = require('console');
class Searches {
    history = [];
    db = './db/database.json';
    constructor() {
        //here we're going to read a DB if exist
        this.readDb()
    }
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historyCapitaliza() {

        return this.history.map(value => {
            let words = value.split(' ')
            words = words.map(p => p[0].toUpperCase()+ p.substring(1))
            return words.join(' ')

        })
    }

    async city(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json `,
                params: this.paramsMapbox
            });
            const resp = await instance.get();

            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        } catch (error) {
            console.log('Info doesnt Found')
            return [];
        }
    }
    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }
    async weather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsWeather,
                    lon,
                    lat,
                }
            });
            const resp = await instance.get();
            const {
                weather,
                main,
                clouds
            } = resp.data;
            return {
                desc: weather[0].description,
                temp: main.temp,
                max: main.temp_max,
                min: main.temp_min,
                clouds: clouds.temp,
            };
        } catch (error) {
            console.log('Info doesnt Found')
            return [];
        }
    }
    addHistory(place = '') {
        //prevent duplied
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }
        this.history.unshift(place.toLocaleLowerCase());
        this.recordDb()
    }
    //record in DB
    recordDb() {
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.db, JSON.stringify(payload))
    };
    readDb() {
        //verify if exist....
        //1. if doesn't exist, it doesn't happend nothing
        if (!fs.existsSync(this.db)) return;
        //2. but if exist you have to load all info .... readFileSync..... path.... {encoding: 'utf-8'}
        const info = fs.readFileSync(this.db, {
            encoding: 'utf-8'
        });
        // const data = JSON.asas(info)
        const data = JSON.parse(info)
        // this.history = ...this.history here returned final result
        this.history = data.history;

        // const {
        //     history
        // } = data;
        // const list = [];
        // history.forEach(e => {
        //     list.push(e)
        // });
        // this.history.forEach(e => {
        //     list.push(e)
        // });
        // return list

    }
}


module.exports = Searches;