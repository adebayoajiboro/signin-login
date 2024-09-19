const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')



const { user } = require('fontawesome')
const email = require('surge/lib/middleware/email')
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

let userArray = []
let todoarray = []
let errormassage = ""


const userschema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:Number},
})

const usermodel = mongoose.model("user_collection", userschema)

const userschema2 = mongoose.Schema({
    email:{type:String},
    password:{type:Number},
})
const usermodel2 = mongoose.model("login_collection", userschema2)


app.get('/', (request, response) => {
    response.render("signup", { errormassage })
    // response.render("login")
    // response.render("index")
})

app.get("/login", (request, response) => {
    response.render("login")
})

app.get("/landingpage", (request, response) => {
    response.render("landingpage")
})

app.post("/signup", async (request, response) => {
  try {
    console.log(request.body);
    const createusers = await usermodel.create(request.body)
    response.redirect("/login")
    if (createusers) {
        console.log("user created successfully");
    }else{
        console.log("unable to create user");
    }
  } catch (error) {
    console.log(error);
}   
    // let body = request.body
    // let existUser = userArray.find((user) => user.email === request.body.email)
    // if (existUser) {
    //     errormassage = "user already exixt"
    //     console.log("user is there");
    //     response.redirect("/")
    // } else {
    //     errormassage = ""
    //     userArray.push(body)
    //     console.log(userArray);
    //     response.redirect("/login")
    //     console.log("signup successfully");
    // }
})

app.post("/login", async (request, response) => {
    try {
        console.log(request.body);
        const createusers2 = await usermodel2.create(request.body)
        response.redirect("/landingpage")
        if (createusers2) {
            
            console.log("login successfully");
            
            
        }else{
            console.log("unable to login ");
            
        }
      } catch (error) {
        console.log(error);
    }
    // let body = request.body
    // let existUser = userArray.find((user) => user.email === request.body.email)
    // if (!existUser) {
    //     console.log("you are not register please sign up");
    // } else {

    // } if (existUser.password == request.body.password) {
    //     console.log("login successful");
    //     console.log(existUser);
    //     response.redirect("/landingpage")
    // } else {
    //     console.log("invalid password");
    // }
})
app.get("/todo", (req, res) => {
    res.render("todo", { todoarray })
})
app.post("/todo", (req, res) => {
    console.log(req.body);
    todoarray.push(req.body)
    console.log(todoarray);
    res.redirect("/todo")
})
app.post("/delete", (req, res) => {
    console.log(req.body)
    let index = req.body.index
    todoarray.splice(index, 1)
    res.redirect("/todo")
})

app.get("/edit/:index", (req, res) => {
    console.log(req.params.index);
    const { index } = req.params
    let onetodo = todoarray[index]
    res.render("edit", { onetodo, index })
})

app.post("/edittodo/:index", (req, res) => {
    console.log(req.body);
    const { index } = req.params
    console.log(todoarray[index]);
    todoarray[index] = req.body
    res.redirect("/todo")
})




const uri = "mongodb+srv://adebayoajiboro250:Adebayo250@cluster0.y8hua.mongodb.net/septemberClass?retryWrites=true&w=majority&appName=Cluster0"
const db_connect = async () => {
    try {
    const connection = await mongoose.connect(uri)
    if (connection) {
        console.log("connected to database");
    }
    } catch (error) { 
        console.log(error);
    }
}

  db_connect()

const port = 8003
app.listen(port, () => {
    console.log(`app started on port ${port}`);
})