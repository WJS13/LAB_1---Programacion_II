const express = require('express')
const app = express()

const {datos} = require('./data')

app.use(express.json())//requerido para trabajar con json

app.get('/', (req, res)=>{
    res.send('<h1>Página Principal</h1><a href="/api/datos">DATOS</a>')
})

app.get('/api/datos', (req, res)=>{
    //res.json(datos)
    const simpleData = datos.map((dato)=>{
        const{id, name, apellidos, dni, edad} = dato
        return{id, name, apellidos, dni, edad}
    })
    res.send(simpleData)
})

app.post('/api/datos',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res
            .status(400)
            .json({success:false,msg:"Proveer nombre"})
    }
    res.status(201).send({success:true,data:[...datos,name]})
})

app.put('/api/datos/:id', (req,res) => {
    const{id}=req.params
    const{name}=req.body
    const data= datos.find((data) => data.id === Number(id))
    if(!data){
        return res.status(404).json({success:false, msg: 'no persona con id: ${id}'})
    }
    const newdato = datos.map(data => {
        if (data.id ===  Number(id)) {
            data.name =name
        }
        return data
        })
        res.status(201).send({success: true, data: newdato})
})

app.delete('/api/datos/:id', (req,res) => {
    const{id}=req.params
    const data= datos.find((data) => data.id === Number(id))
    if(!data){
        return res
        .status(404)
        .json({success:false, msg: 'no persona con id: ${id}'})
    }
    const newdatos = datos.filter(data => data.id !==  Number(id))
    return res.status(200).send({success: true, data: newdatos})
})    

app.listen(5500,()=>{
    console.log('Server esta en el puerto 5500...');
})