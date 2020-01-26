const request = require('request'); 

const geolocation = (city, callback) =>{
   
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?access_token=pk.eyJ1IjoiYmhhdmFuaTAwMiIsImEiOiJjazViZzhmengxYXR5M2RteWl4cXdtbmU3In0.5ZtcVWK5qzDeI2JanNeFpg";
    console.log(url);
    request({url : url, json: true}, (error, response)=>{
          
      //console.log(response.body.features.length);
    
       if(error){

        callback("unable to connect location services", undefined);
      }
      
      else if(response.body.features.length === 0){
        console.log("hey iam in geo location length checking method");
      callback("No location found, please give another try", undefined);
    } else{

      const {center, place_name} = response.body.features[0];
        callback(undefined, {
            latitude : center[1],
            longitude: center[0],
            place_name

        })
    }
})
}

module.exports = geolocation;