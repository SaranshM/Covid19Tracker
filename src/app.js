const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bp=require('body-parser')

const app = express()
const port = process.env.PORT || 3000
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

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get('*',(req,res)=>{
    res.render('error404')
})

app.post('/region/:id',post, (req,res) => {
    
    var d = new Date();
    // console.log(d.getFullYear());
    if(req.params.id=="country")
    {
        list_of_states = [
            'Maharashtra',
            'Gujarat',
            'Delhi',
            'Madhya Pradesh',
            'Rajasthan',
            'Tamil Nadu',
            'Uttar Pradesh',
            'Andhra Pradesh',
            'Telangana',
            'West Bengal',
            'Jammu and Kashmir',
            'Karnataka',
            'Kerala',
            'Bihar',
            'Punjab',
            'Haryana',
            'Odisha',
            'Jharkhand',
            'Chandigarh',
            'Uttarakhand',
            'Himachal Pradesh',
            'Assam',
            'Chhattisgarh',
            'Andaman and Nicobar Islands',
            'Ladakh',
            'Meghalaya',
            'Puducherry',
            'Goa',
            'Manipur',
            'Tripura',
            'Mizoram',
            'Arunachal Pradesh',
            'Nagaland',
            'Dadra and Nagar Haveli',
            'Daman and Diu',
            'Lakshadweep',
            'Sikkim'
          ]
          var i
          var flag = 0 
          for(i=0;i<list_of_states.length;i++){
            if(req.body.place.toLowerCase()==list_of_states[i].toLowerCase()){
                flag = 1
            }
          }
          if(flag==1){
            module.exports = req.body.place
            var func = require('./utils/indian_states.js')
    
            func(req.body.place,(error,data)=>{
                        if(error){
                            
                            res.send(error)
                        }else{
                            // console.log(data)
                            res.send(data)
                        }
                    })
          }else{
        //fetch data for country
        // console.log(req.body.place);
        module.exports = req.body.place;
        var func = require('./utils/request.js')

        func(req.body.place,(error,data)=>{
                    if(error){
                        res.send(error)
                    }else{
                        // console.log(data)
                        res.send(data);
                    }
                })
            }

    }
    else if(req.params.id=="state")
    {
        //fetch data for state
        //fetch country from req.body.country
        // console.log(req.body);
        if(req.body.country=='India'){
        module.exports = req.body.place
        var func = require('./utils/indian_states.js')

        func(req.body.place,(error,data)=>{
                    if(error){
                        
                        res.send(error)
                    }else{
                        // console.log(data)
                        res.send(data)
                    }
                })
            }else{
                res.send({
                    msg: 'Data Not Available yet',
                    country:req.body.place
                })
            }

    }
    else if(req.params.id=='world')
    {

        var func = require('./utils/world.js')

        func((error,data)=>{
            if(error){
                res.send(error)
            }else{
                // console.log(data)
                res.send(data);
            }
        })
    }
    
    


})


app.listen(port,()=>{
    console.log('server side js is up running.')
})