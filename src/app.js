const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port =process.env.PORT || 3000


const geolocation = require('../src/utils/geolocation');
const forecast = require('../src/utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bhavani Kuppagiri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bhavani Kuppagiri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Bhavani Kuppagiri'
    })
})

app.get('/weather', (req, res) => {

   
     
    const add = req.query.address;
    if(!add){

       return res.send({

            error: 'Provide address it is mandatory'
        } )
    }
       geolocation(add, (err, data) =>{

          
        console.log("add received in app.js source"+ add);
            if(err){

                return res.send({err});
            }
           
            forecast(data.latitude, data.longitude,(err,weatherdata)=>{


                if(err){
                    return res.send({err});
                }
                
                res.send({

                    forecast : weatherdata,
         
                    location: data.place_name,

                    address : add

                });
            })


        })

        
    })

   

 


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bhavani Kuppagiri',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bhavani Kuppagiri',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('server is running on port num' +port)
})