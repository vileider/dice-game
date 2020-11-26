const express =require('express');

const app = express();

app.get('/endpoint1',(req,res) => {
    res.send('DiceGame-v0.0.1');
})


app.listen(8000);