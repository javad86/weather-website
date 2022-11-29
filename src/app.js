const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const app = express()

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Javad Yarahmadi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Javad Yarahmadi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Javad Yarahmadi',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error){
            return res.send({error})
        }
    
    
        forecast(lat, lon, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Javad Yarahmadi',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Javad Yarahmadi',
        errorMsg: '404 - Page Not Found'
    })
})


app.listen(3000, () => {
    console.log('listening for incoming requests..')
})
