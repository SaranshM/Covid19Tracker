const place = require('../app.js')
const request = require('request')
const url = 'https://api.covid19india.org/data.json'

const func = (place,callback)=>{

    request( {url, json:true}, (error,response)=>{
        if(error){
            callback('Error Message',undefined)
        }else{
            var x =response.body.statewise
            var i
            for(i=0;i<x.length;i++){
                if(place==x[i].state){
                    break
                }
            }
            var obj = {
                state: x[i].state,
                statecode: x[i].statecode,
                confirmed: x[i].confirmed,
                active:x[i].active,
                recovered: x[i].recovered,
                deaths: x[i].deaths

            }
            callback(undefined,obj)
        }
    } )
}

module.exports = func