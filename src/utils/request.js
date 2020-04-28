const place = require('../app.js')
const request = require('request')


const func = (place,callback)=>{
    console.log(place);

    // var today_date=new Date();
    // var today_year=today_date.getFullYear();
    // var today_month=today_date.getMonth() +1;
    // if(today_month<10)
    // {
    //     today_month='0'+today_month.toString()
    // }
    // var today_date_value=today_date.getDate();
    // if(today_date_value<10)
    // {
    //     today_date_value='0'+today_date_value.toString()
    // }

    // var yest_date=new Date();
    // yest_date.setDate(yest_date.getDate() - 1);
    // var yest_year=yest_date.getFullYear();
    // var yest_month=yest_date.getMonth() +1;
    // if(yest_month<10)
    // {
    //     yest_month='0'+yest_month.toString()
    // }
    // var yest_date_value=yest_date.getDate();
    // if(yest_date_value<10)
    // {
    //     yest_date_value='0'+yest_date_value.toString()
    // }

    // const url = 'https://api.covid19api.com/country/'+place+'?from='+today_year+'-'+today_month+'-'+today_date_value+'T00:00:00Z&to='+yest_year+'-'+yest_month+'-'+yest_date_value+'T00:00:00Z';
    
    const url = 'https://api.covid19api.com/total/country/'+place;
    console.log(url);
    request( {url, json:true}, (error,response)=>{

        if(error){

            callback('Error Message',undefined)

        }else if(response.body.message){

            callback('Country Not found',undefined)

        }else if(response.body.length==0){

            callback('No data to display',undefined)

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
    } )
}

module.exports = func