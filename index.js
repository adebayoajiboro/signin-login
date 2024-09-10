const express = require('express')
const app = express()
const ejs = require('ejs')
const { user } = require('fontawesome')
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

let userArray = []
let errormassage = ""


app.get('/',(request, response) => {
    response.render("signup", {errormassage})
    // response.render("login")
    // response.render("index")
})

app.get("/login",(request, response) =>{
    response.render("login")
})
app.post("/pgc", (req, res)=>{
    console.log(req.body);
    let existUser = userArray.find((user)=> user.email === req.body.email)
    if (existUser) {
        res.render("landingpage")
    }else{
        console.log("Incorrect Email");
        
    }
    
})
app.get("/landingpage",(request, response) =>{
    response.render("landingpage")
})
app.post("/signup", (request,response) =>{
    console.log(request.body);
    let body = request.body
    let existUser = userArray.find((user)=> user.email === request.body.email)
    if (existUser) {
        errormassage = "user already exixt"
        response.redirect("/")
    }else{
        errormassage = ""
        userArray.push(body)
        console.log(userArray);
        response.redirect("/login")
    }
})


const port = 8003
app.listen(port,() =>{
    console.log(`app started on port ${port}`);
})