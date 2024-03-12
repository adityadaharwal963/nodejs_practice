const express = require('express');
const mongoose = require('mongoose');
const Customer = require('../modules/customer')
mongoose.set('strictQuery',false);
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const app = express();
const CONNECTION = process.env.CONNECTION;
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const json = {
    "key":"value",
    "name":"JAG",
    "colorArray":["red","blue"],
    "numbers":[1,2,3,4],
    "nest":[
        {"id":"222",
        "name": "hoho"}
        ,
        {"id":"232",
        "name":"coco"}
    ]
}

const customers = [
    {
        "name" : "pande",
        "industry": "Web dev"
    },
    {
        "name":"jamjar",
        "industry":"blockchain"
    },
    {
        "name":"dadliwar",
        "industry":"CP"
    }
]

const customer = new Customer({
    name: "adi",
    industry:"tech"
});

//customer.save();
app.get('/',(req,res)=>{
    res.send(customer);
});

app.get('/api/customer',async (req,res) =>{
    try{
        const result = await Customer.find()
        res.json({"customer":result});
    }catch(e){
        res.sendStatus(500).json({error:e.message});
    }
    
})

app.post('/',(req,res)=> {
    res.send('working with post req ');
});

app.post('/api/customer',(req,res)=> {
    console.log(req.body);

    const customer = new Customer({
        name : req.body.name,
        industry : req.body.industry
    });
        // const customer = new Customer(req.body);
    try{
        customer.save();
        res.status(201).json({customer});
    }catch(e){
        res.status(400).json({error:e.message});
    }

    
});


const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
        app.listen(PORT,() => {
            console.log("app listing for port " + PORT);
        });
    }catch(error){
        console.log(error.message);
    }
    
};

start();
