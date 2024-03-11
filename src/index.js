const express = require('express');
const app = express();
const PORT = 3000;
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
app.get('/',(req,res) =>{
    res.send({"data":json.nest});
})

app.post('/',(req,res)=> {
    res.send('working with post req ');
});
app.listen(PORT,() => {
    console.log("app listing for port 3000");
});

