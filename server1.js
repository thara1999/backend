const express=require('express')


const server=express();
server.use(express.json());
//middleware
items=[
    {
    id:1,name:'tamil'},
    {id:2,name:'sharan'},
        { id:3,name:'soujanya'}
];
//get
server.get('/about',(req,res)=>{
    res.send(items)
})

//post
server.post('/about',(req,res)=>{

const newitem={id:items.length+1,name:req.body.name}
items.push(newitem);
res.status(200).json(newitem)
}
)
//put 
server.put('/about/:id',(req,res)=>
{
    const itemid=parseInt(req.params.id);
  const  itemupdate=items.findIndex((item)=>item.id===itemid);

if(itemupdate !== -1){
    items[itemupdate].name=req.body.name;
    res.json(items[itemupdate]);
}
else{
    res.status(200).send('item updated')
}
})




server.listen(3000,()=>
{
    console.log(`server is running on http://localhost:3000`);
});