const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bp=require('body-parser')

const app = express()

const post=bp.urlencoded({extended:false});
app.use(bp.json());

//paths
const publicpath = path.join(__dirname,'../client')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialspath)

app.set('view engine','hbs')
app.set('views',viewspath)

app.use(express.static(publicpath))

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/region/:id',post, (req,res) => {
    

    if(req.params.id=="country")
    {
        //fetch data for country
        console.log(req.body.place);
        module.exports = req.body.place;
        var func = require('./utils/request.js')

        func(req.body.place,(error,data)=>{
                    if(error){
                        const msg = {
                            error: 'Error Occured'
                        }
                        res.send(msg)
                    }else{
                        console.log(data)
                        res.send(data);
                    }
                })

    }
    else if(req.params.id=="state")
    {
        //fetch data for state
        module.exports = req.body.place
        var func = require('./utils/indian_states.js')

        func(req.body.place,(error,data)=>{
                    if(error){
                        const msg = {
                            error: 'Error Occured'
                        }
                        res.send(msg)
                    }else{
                        console.log(data)
                        res.send(data)
                    }
                })

    }
    
    


})


app.listen(3000,()=>{
    console.log('server side js is up running.')
})