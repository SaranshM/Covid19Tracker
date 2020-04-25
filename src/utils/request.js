const place = require('../app.js')
const request = require('request')
const url = 'https://api.covid19api.com/country/'+place

const func = (place,callback)=>{

    request( {url, json:true}, (error,response)=>{
        if(error){
            callback('Error Message',undefined)
        }else{
            // console.log(response.body[response.body.length - 1])
            var x =response.body[response.body.length - 1]
            var active = x.Confirmed - x.Recovered - x.Deaths
            var obj = {
                country: x.Country,
                countryCode : x.CountryCode,
                confirmed: x.Confirmed,
                deaths: x.Deaths,
                recovered: x.Recovered,
                active,
                date : x.Date

            }
            callback(undefined,obj)
        }
    } )
}

module.exports = func