const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()


//paths
const publicpath = path.join(__dirname,'../client')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialspath)

app.set('view engine','hbs')
app.set('views',viewspath)

app.use(express.static(publicpath))

app.get( '', (req,res) => {
    res.render('index')
})


app.listen(3000,()=>{
    console.log('server side js is up running.')
})