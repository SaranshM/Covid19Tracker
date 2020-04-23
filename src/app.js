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

app.post('/hello',post, (req,res) => {
    console.log(req.body.place);
    
    if(req.body.place=='India' || req.body.place=='india'){

        var func = require('./utils/request.js')
        
        func((error,data)=>{
            if(error){
                const msg = {
                    error: 'Error Occured'
                }
                res.render('index',msg)
            }else{
                console.log(data)
                res.render('index',data)
            }
        })
        

    }
    


})


app.listen(3000,()=>{
    console.log('server side js is up running.')
})