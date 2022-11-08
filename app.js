const express = require('express')
const app = express()

const {users} = require('./data')

app.use(express.json()) //requerido para trabajar con json

app.get('/', (req, res)=>{
    res.send('<h1>Página Principal</h1><a href="/api/users">USUARIOS</a>')
})

app.get('/api/users', (req, res)=>{
    // res.json(users)
    const dataUsers = users.map((dato)=>{
        const {id, name, surname, dni, age} = dato
        return {id, name, surname, dni, age}
    })
    res.send(dataUsers)
})

app.post('/api/users',(req,res)=>{
    const {id, name, surname, dni, age} = req.body
    const test_id= users.find((data) => data.id === id)
    if(test_id){
        return res
            .status(400)
            .json({success:false, msg:`Ya exite una persona con un id igual a ${id}`})
    }
    if(!id || !name || !surname || !dni || !age){
        return res
            .status(400)
            .json({success:false,msg:"Faltan datos. Ingrese correctamente lo siguiente: id, name, surname, dni y age."})
    }

    res.status(201).send({success:true,data:[...users,{id, name, surname, dni, age}]})
})

app.put('/api/users/:id', (req,res) => {
    const{id}=req.params
    const{name, surname, dni, age}=req.body
    const data= users.find((data) => data.id === Number(id))
    if(!data){
        return res.status(404).json({success:false, msg: `no persona con id: ${id}`})
    }
    const newdato = users.map((data) => {
        if (data.id ===  Number(id)) {
            if (name != null){
            data.name = name   
            }
            if (surname != null){
            data.surname = surname   
            }
            if (dni != null){
            data.dni = dni  
            }
            if (age != null){
            data.age = age   
            }
        }
        return data
        })
    res.status(201).send({success: true, data: newdato})
})

app.delete('/api/users/:id', (req,res) => {
    const{id}=req.params
    const data= users.find((data) => data.id === Number(id))
    if(!data){
        return res
        .status(404)
        .json({success:false, msg: `no persona con id: ${id}`})
    }
    const newdatos = users.filter(data => data.id !==  Number(id))
    return res.status(200).send({success: true, data: newdatos})
})    

app.listen(4000,()=>{
    console.log('Server esta en el puerto 4000...');
})