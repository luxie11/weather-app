const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a:{
            demand:true,
            alias: 'address',
            describe: 'Iveskite adresa, kad butu gaulima gauti orus',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;

const userAddress = argv.address;

var encodedValue = encodeURIComponent(userAddress);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDaHcZvSyInIGROtyZ6i37hPBlI-qZhSQc&address=${encodedValue}`;

axios.get(geocodeURL).then((response) =>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that adress');
    } else {
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherURL = `https://api.darksky.net/forecast/cf3a775bc1585bdc5dcd0259f6df0ca7/${lat},${lng}`;
        console.log('Adress: ',response.data.results[0].formatted_address);
        return axios.get(weatherURL);
    }
}).then(response => {
    var temperature = response.data.currently.temperature;
    var actualTemperature = response.data.currently.apparentTemperature;
    console.log('Temperature:' , Math.floor((temperature -32) * 5/9));
    console.log('Feels like:', Math.floor((actualTemperature - 32) * 5/9));
})
.catch(error => {
    if(error.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers')
    } else{
        console.log(error.message);
    }
});


