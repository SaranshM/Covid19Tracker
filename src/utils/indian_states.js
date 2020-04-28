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
            statecode = (x[i].statecode).toLowerCase()
            const everyday = (statecode, callback)=>{

                const url = 'https://api.covid19india.org/states_daily.json'

                request( {url, json:true}, (error,response)=>{
                    if(error){
                        callback({
                            everyday: []
                        })
                    }else{
                        var x =response.body.states_daily
                        var i = 0
                        var arr = []
                        var str1 = 0
                        var str2 = 0
                        var str3 =0
                        while(i<x.length-1){
                            str1 += parseInt(x[i][statecode])
                            active = str1
                            elem = {
                            date: x[i].date,
                            confirmed: str1
                            }
                            i++
                            str2 += parseInt(x[i][statecode])
                            active-=str2
                            elem2 = {
                            recovered: str2
                            }
                            elem = Object.assign(elem,elem2)
                            i++
                            str3 += parseInt(x[i][statecode])
                            active-= str3
                            elem2 = {
                                active,
                                deaths: str3
                            }
                            i++
                            elem = Object.assign(elem,elem2)
                            arr.push(elem)
                        }
                        callback({
                            everyday: arr
                        })
                    }
                } )

            }

            const district = (statecode,callback)=>{
                statecode = statecode.toUpperCase()

                const url = 'https://api.covid19india.org/v2/state_district_wise.json'

                request( {url, json:true}, (error,response)=>{
                    if(error){
                        callback({
                            districtData: []
                        })
                    }else{
                        var x =response.body
                        var i
                        var arr = []
                        for(i=0;i<x.length;i++){
                            if(x[i].statecode==statecode){
                                break
                            }
                        }

                        var length = x[i].districtData.length
                        var j
                        var vari = x[i].districtData
                        for(j=0;j<length;j++){
                            elem = {
                                district: vari[j].district,
                                confirmed: vari[j].confirmed,
                                active: vari[j].active,
                                recovered: vari[j].recovered,
                                deaths: vari[j].deceased
                            }

                            arr.push(elem)
                        }

                        callback({
                            districtData: arr
                        })
                    }
                } )

            }

            everyday(statecode,(objec)=>{

                district(statecode,(obj3)=>{


                    var obj2 = Object.assign(obj,objec)
                    obj2 = Object.assign(obj2,obj3)
                    callback(undefined,obj2)

                })
                

            })

            // callback(undefined,obj)
        }
    } )
}

module.exports = func