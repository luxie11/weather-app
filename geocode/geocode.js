const request = require('request');

const geocodeAddress = (address, callback) =>{
    var encodedValue = encodeURIComponent(address);

    //Reikia, kad vartotojas ivestu Geguziu 73 Siauliai

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDaHcZvSyInIGROtyZ6i37hPBlI-qZhSQc&address=${encodedValue}`,
        json: true
    },(error, response, body)=>{
        if(error){
            callback('Unable to connect to Google servers');
        } else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address');
        } else if(body.status === 'OK'){
            callback(undefined,{
                address:body.results[0].formatted_address,
                lat:body.results[0].geometry.location.lat,
                lng:body.results[0].geometry.location.lng
            });
            // console.log(`Address: ${body.results[0].formatted_address}\n`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
        // console.log(`Address: ${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea3},${body.results[0].locations[0].adminArea1}\n`);
        // console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        // console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`); 
    });
};

module.exports.geocodeAddress = geocodeAddress;
