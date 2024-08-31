const port = 5000;
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Express app is runnung");
})


app.listen(port, (error)=> {
    if(!error){
        console.log("server is running on port " + port);
    }
    else{
        console.log("Error in running server" , + error)
    }
})