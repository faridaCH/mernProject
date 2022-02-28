//  le fichier de base qui derige tous le programme back
const express = require("express");
const bodyParser=require('body-parser');
const userRoutes=require("./routes/user.routes");
// configuration de chemin de la variable d"envirenement
require("dotenv").config({path:"./config/.env"});
require("./config/db");
const app=express();

// traiter la data qui transite
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//routers
app.use("/api/user",userRoutes);
// configuration de port( server)
app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT);
    console.log("listning on port "+ process.env.PORT);
})