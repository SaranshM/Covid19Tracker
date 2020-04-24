const request = require('request')

const url = 'https://api.covid19india.org/data.json';

const func = (callback)=>{

    request( {url, json:true}, (error,response)=>{
        if(error){
            callback('Error Message',undefined)
        }else{
            var obj = {
                active: response.body.statewise[0].active,
                confirmed: response.body.statewise[0].confirmed,
                deaths: response.body.statewise[0].deaths,
                recovered: response.body.statewise[0].recovered
            }
            callback(undefined,obj)
        }
    } )
}

module.exports = func