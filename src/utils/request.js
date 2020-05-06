const place = require('../app.js')
const request = require('request')


const func = (place,callback)=>{
    // console.log(place);
    
    const url = 'https://api.covid19api.com/total/country/'+place;
    // console.log(url);
    request( {url, json:true}, (error,response)=>{
        // console.log(response.body[0]);
        if(error){
            
            callback({msg:'Error Message'},undefined)

        }else if(response.body.message){
            
            callback({msg:'Country Not found',country:place},undefined)

        }else if(response.body.length==0){
            
            callback({msg:'No data to display',country:place},undefined)
            //after tplace is an Indian state.

        }else if(response.body[0].Country){

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

            const everyday = (callback)=>{
                
            const url = 'https://api.covid19api.com/total/dayone/country/'+place

            request( {url, json:true}, (error,response)=>{
                if(error){
                    callback({
                        everyday: []
                    })
                }else{
                    var x =response.body
                    var i
                    var arr = []
                    for(i=0;i<x.length;i++){
                        active = x[i].Confirmed - x[i].Recovered - x[i].Deaths
                        elem = {
                        date: x[i].Date,
                        confirmed: x[i].Confirmed,
                        active,
                        recovered: x[i].Recovered,
                        deaths: x[i].Deaths
                        }

                        arr.push(elem)
                    }
                    callback({
                        everyday: arr
                    })
                }
            } )

            

        }

            
            everyday((objec)=>{
                const obj2 = Object.assign(obj,objec)
                callback(undefined,obj2)

            })
            // console.log(sample)
            // const obj2 = Object.assign(obj,{})
            // callback(undefined,obj2)

        

        }
        else
        {
            
            callback({msg:'Country Not found',country:place},undefined)
        }
    } )
}

module.exports = func