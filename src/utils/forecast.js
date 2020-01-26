const request = require('request');

const forecast = (latitude, longitude,callback) => {
    const url = "https://api.darksky.net/forecast/7a0e1289114ab71c708d6a3d90983949/"+latitude+","+longitude+"?units=si";

    request({url, json: true}, (error,Response)=>{
   
       if(error){
           callback("Unable to connect to weather application", undefined);
       } else if (Response.body.error){

        callback("error with request, try again!!!", undefined);

       }
       else{
        const {temperature, precipProbability,humidity} = Response.body.currently;
        console.log(Response.body.currently);
      
        callback(undefined, "Current temperature is: "+temperature+" ,Probability of rain is: "+precipProbability+" and humidity is: "+humidity);
       }

    })

}
module.exports = forecast;