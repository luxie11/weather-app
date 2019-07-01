const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(userAddress, (errorMessage, results) =>{
    if(errorMessage){
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address:${results.address}\n`);
        weather.getWeather(results.lat,results.lng,(errorMessage, results)=>{
            if(errorMessage){
                console.log(errorMessage);
            } else{
                console.log(`Temperature: ${results.temperature}`);
                console.log(`Sensitive temperature: ${results.fellingTemperature}`);
            }
        });
    }
});





