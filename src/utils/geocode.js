
const request = require('request')

//189%20Geranium%20Court,%20Paramus,%20NJ%20United%20States

const geocode = (location, callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text='+ encodeURIComponent(location) + '&apiKey=5bdaf143eb8b49c18529d3856b960f57'
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('could not connect to geoapify', undefind)
        } else if (body.error) {
            callback('Bad location', undefined)
        } else {
            callback(undefined, {
                lon: body.features[0].properties.lon,
                lat: body.features[0].properties.lat,
                location: body.features[0].properties.formatted
            })
        }
    })
}

module.exports = geocode
