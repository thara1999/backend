// importing express
const express=require('express');
//creating a server
const mongoose=require('mongoose');
const server=express();

require('dotenv').config();
// configuring env file
//assign a port number
const port=5000;
const mongoURI = process.env.mongo_uri;
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => console.error('MongoDB connection error:', error));
//creating schema
const itemSchema = new mongoose.Schema({
    name: 
    {
        type:String,
        required: true}
        ,
    price: {
        type:Number,
        required: true}

});
//model
const Item = mongoose.model('Item', itemSchema);


//middleware
server.use(express.json());
server.get('/',(req,res)=>{
    res.end("server is running");
}
);
server.get('/product',(req,res)=>{
    res.json(items)
});

server.post('/product',(req,res)=>{
    newitem={id:items.length+1,name:req.body.name};
    items.push(newitem);
    res.status(201).json(newitem);
});

server.put('/product/:id',(req,res)=>
{
    const itemid=parseInt(req.params.id);
    const updateditem=items.findIndex((item)=>item.id===itemid);
    if(updateditem !== -1){
        items[updateditem].name=req.body.name;
        res.json(items[updateditem]);
    }
    else{
        res.status(404).json("item not found in data base")
    }
}
);


server.delete('/product/:id',(req,res)=>
{
    const itemid=parseInt(req.params.id);
     const itemIndex=items.findIndex((item)=>item.id===itemid);
     if (itemIndex !== -1) { 
        const deletedItem = items.splice(itemIndex, 1); 
        res.json(deletedItem);
      } else {
        res.status(404).send('Item not found in database');
      }
  
    }
)



server.listen(port,()=>
    console.log(`server is running on http://localhost:${port}`)
);
