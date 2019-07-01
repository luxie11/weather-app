const request = require('request');

const geocodeAddress = (address, callback) =>{
    var encodedValue = encodeURIComponent(address);
	
	var key = 'ENTER_GOOGLE_API_GEOCODE_KEY';
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${encodedValue}`,
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
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
