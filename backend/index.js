const express = require('express')
const mongoose = require('mongoose')
const ModelJedzenia = require('./mongoose.js')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://123:12345@food.0wi7d.mongodb.net/juzniepierwsza?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.post('/dodaj', async (req,res) =>{
    const nazwajedzenia = req.body.nazwajedzenia
    const ilosc = req.body.ilosc
    const jedz = await new ModelJedzenia({nazwa: nazwajedzenia, ile:ilosc})
    try {
        
        jedz.save()
        console.log("siemka")
        res.send("dodalo sie")
    } catch (error) {
        console.log(error)
    }
})

app.delete('/usun/:id', async(req,res) =>{
    const id = req.params.id
    console.log(id)
    await ModelJedzenia.findByIdAndRemove(id)
})
app.put('/zaktualizuj', async(req,res) =>{
    const nowanazwa = req.body.nowanazwa
    const id = req.body.id
    // console.log(id)
    
    try {
        await ModelJedzenia.findById(id,(err, nowejedzenie)=>{
            nowejedzenie.nazwa=nowanazwa
            nowejedzenie.save()
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/read', async(req,res) =>{
    ModelJedzenia.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
})



app.listen('3001',() =>{
    console.log('dziala na porcie 3001 :)')
})
