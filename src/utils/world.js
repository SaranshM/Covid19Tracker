const request = require('request')
const url = 'https://api.covid19api.com/summary';

const func = (callback)=>{

    request( {url, json:true}, (error,response)=>{
        if(error){
            callback({msg:'Error Message'},undefined)
        }
        else if(!response.body.Global)
        {
            callback({msg:'Error Message'},undefined)
        }
        else{
            var x =response.body.Global
            var active = x.TotalConfirmed - x.TotalDeaths - x.TotalRecovered
            var obj = {
                country: "World",
                confirmed: x.TotalConfirmed,
                deaths: x.TotalDeaths,
                recovered: x.TotalRecovered,
                active
            }
            callback(undefined,obj)
        }
    } )
}
//Function Calling
// func((error,data)=>{
//     if(error){
//         const msg = {
//             error: 'Error Occured'
//         }
//         res.send(msg)
//     }else{
//         console.log(data)
//     }
// })

module.exports = func