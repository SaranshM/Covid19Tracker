const request = require('request')
const url = 'https://api.covid19api.com/summary';
const xmlParser = require('xml-js')

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

            const news = (callback)=>{

                const url = 'https://news.google.com/rss/search?q=covid-19&hl=en-US&sort=date&gl=US&num=100&ceid=US:en'

                request( {url}, (error,response) => {

                    if(error){
                        callback({msg:'Error Message'},undefined)
                    }else{
                        var data = xmlParser.xml2json(response.body,{ compact: true, spaces: 4})
                        data = JSON.parse(data)
                        callback(undefined,data)
                    }
                })

            }

            news( (error,data) =>{

                if(error){

                    callback(error,undefined)

                }else{

                    temp = {
                        news: {
                            title: "\"Covid19\" - Google News",
                            link: data.rss.channel.link._text,
                            updated: data.rss.channel.lastBuildDate._text,
                            description: data.rss.channel.description._text,
                            items: []
                        }
                    }


                    var x =data.rss.channel.item
                    var i

                    for(i=0;i<7;i++){

                        elem = {
                            title: x[i].title._text,
                            link: x[i].link._text,
                            description: x[i].description._text,
                            updated: x[i].pubDate._text
                        }
                        if(i==0){

                        }
                        temp.news.items.push(elem)
                    }



                    obj = Object.assign(obj,temp)
                    // console.log(obj.news.items[0])
                    callback(undefined,obj)
                }
            })

            
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