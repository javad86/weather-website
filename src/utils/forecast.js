const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=76a2f2bb05f4173656ef1fbf0b28e284&query=37.8267,-122.4233'
const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=76a2f2bb05f4173656ef1fbf0b28e284&query=' + lon + ',' + lat + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Couldn\'t connect to weatherstack', undefined)
        } else if (body.error) {
            callback('Address does not exist', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ': It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + ' chance of rain.')
        }
    })
}

module.exports = forecast
