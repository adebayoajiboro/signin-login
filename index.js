const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')




// const { user } = require('fontawesome')
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))


const userschema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
})

const shopifyschema = mongoose.Schema({
    item  : { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true },
    // amount : { type: Number, trim: true, required: true },
})

const shopmodel = mongoose.model("shop_collection", shopifyschema)


const usermodel = mongoose.model("user_collection", userschema)


const todoschema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
}, { timestamps: true })

const todomodel = mongoose.model("todo_collection", todoschema)
let userArray = []
let todoarray = []
let errormassage = ""







app.get("/ShopingList", async (req, res) => {
    const okay = await shopmodel.find()
    console.log(okay);
    res.render("ShopingList", { okay })
    
    // res.render("ShopingList")
})
app.post("/deleteShoping", async (req, res) => {
    console.log(req.body)
    try {
        const {id} = req.body
       const deleted = await todomodel.findByIdAndDelete({_id:id})
       console.log(deleted);
       res.redirect("/ShopingList")
     } catch (error) {
        console.log(error);
        res.redirect("/ShopingList")
    }
})

app.post("/submit", async (req, res)=>{
    let pushData = new shopmodel (req.body)
    pushData.save().then(()=>{
        console.log("saved sucessfully");
        
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/ShopingList")
})

// app.get("/submit", async (req, res) => {
   
// })




app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/landingpage", async (req, res) => {
    res.render("landingpage")
})



app.get("/todo", async (req, res) => {
    const alltodo = await todomodel.find()
    console.log(alltodo);
    res.render("todo", { alltodo })
})



app.post("/signup", async (req, res) => {
    console.log(req.body);

    try {
        const createusers = await usermodel.create(request.body)
        if (createusers) {
            console.log("user created successfully");
            res.redirect("/login")
        } else {
            console.log("unable to create user");
            res.redirect("/")
        }
    } catch (error) {
        console.log(error);
        res.redirect("/")
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

app.post("/login", async (req, res) => {
    console.log(req.body);
    //   destructionring
    const { email, password } = req.body
    try {
        const existUser = await usermodel.findOne({ email: email })
        console.log(existUser);
        if (existUser && existUser.password == password) {
            console.log("login successful");
            res.redirect("/landingpage")
        } else {
            console.log("invalid user");
            res.redirect("/login")
        }

    } catch (error) {
        console.log(error);
        res.redirect("/login")


    }

    // try {
    //     console.log(request.body);
    //     const createusers2 = await usermodel2.create(request.body)
    //     response.redirect("/landingpage")
    //     if (createusers2) {

    //         console.log("login successfully");


    //     }else{
    //         console.log("unable to login ");

    //     }
    //   } catch (error) {
    //     console.log(error);
    // }
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


app.get('/', (req, res) => {
    res.render("signup", { errormassage })
    // response.render("login")
    // response.render("index")
})
app.post("/todo", async (req, res) => {
    console.log(req.body);

    try {
        const todo = await todomodel.create(req.body)
        
        

        if (todo) {
            console.log("todo created successfully");
            res.redirect("/todo")
        } else {
            console.log("error occured");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/todo")

    }

})
app.post("/delete", async (req, res) => {
    console.log(req.body)
    try {
        const {id} = req.body
       const deleted = await todomodel.findByIdAndDelete({_id:id})
       console.log(deleted);
       res.redirect("/todo")
       
       
        
    } catch (error) {
        console.log(error);
        res.redirect("/todo")
    }

    // todoarray.splice(index, 1)
})

app.get("/edit/:id",async (req, res) => {
    const {id} = req.params
    try {
       const getedit = await todomodel.findOne({_id:id})
       console.log(getedit);
       
       res.render("edit", {  getedit })
        
    } catch (error) {
        console.log(error);
        res.redirect("/todo")

        
        
    }
    // const { index } = req.params
    // let onetodo = todoarray[index]
    // 
})

app.post("/edittodo/:id", async (req, res) => {
    console.log(req.body);
    const {id} = req.params
    const {title, content} = req.body
    try {
       const postedit = await todomodel.findOneAndUpdate(
        {_id:id},
        {title:title, content:content},
        {new:true}

    )
       console.log(postedit);
       res.redirect("/todo")
       
        
    } catch (error) {
        console.log(error);
        res.redirect("/edit/:id")
        
        
    }
    // const { index } = req.params
    // console.log(todoarray[index]);
    // todoarray[index] = req.body
    // res.redirect("/todo")
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