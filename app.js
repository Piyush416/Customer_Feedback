const express = require("express")
const path = require("path");
const { connected } = require("process");
const app = express();

const PORT = 4001;

//relative path
const homePage = path.join(__dirname,"./public/html/home.html")
const loginPage = path.join(__dirname,"./public/html/login.html")
const registrationPage = path.join(__dirname,"./public/html/registration.html")
const style = path.join(__dirname,"./public")

// middlewar 
app.use(express.static(style))

console.log(style);



app.get("/", (req,res)=>{
    res.sendFile(homePage)
})


app.get("/login",(req,res)=>{

    res.sendFile(loginPage)
})


app.get("/registration",(req,res)=>{

    res.sendFile(registrationPage)
})


app.listen(PORT, ()=>
    {
        console.log(`http://localhost:${PORT}`);
    })