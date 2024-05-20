require('dotenv').config()
const cors = require('cors')
const express = require('express');
const path = require('path') // path is built in
const coursesRouter = require('./routes/courses.route')
const usersRouter = require('./routes/users.route')
const httpStatusText = require('./utilities/httpStatusText')
const app = express();
const port = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use('/api/courses/',coursesRouter);
app.use('/api/users/',usersRouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads'))) // express.static hy5li upload folder yb2a static folder, 3shan a serv ay 7aga static zy el css aw el pictures
// global middleware for not found router
app.all("*",(req, res) =>{
  res.status(404).json({
    status: httpStatusText.ERROR, Message: 'Invalid;'
  })
})
// global error handler
app.use((error,req, res,next)=>{
  res.status(error.statusCode || 500).json({ 
    status: error.statusText || httpStatusText.ERROR,
    Message: error.message,
    code: error.statusCode || 500,
    data: null
  })
})

//----------------------------------------------------------------
const mongoose = require('mongoose')
const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(()=>{
  console.log("Connected")
})



//----------------------------------------------------------------
/* const Cat = require("./models/cat.model")
const cat1 = new Cat({
  name: 'cat1',
  price: 100
})

cat1.save().then(()=>{
  console.log(cat1)
}) */
//----------------------------------------------------------------



/* const mongoose = require ('mongoose')
const uri = "mongodb+srv://belalsamir100:xjVr0aXZvLtvDa2v@cluster-db.tcfucet.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster-db";
mongoose.connect(uri).then(()=>{
  console.log("Connected")
})
app.use('/api/courses/',router)
app.use(express.json());
app.listen(port, () => console.log(`listening on port ${port}!`))
 */

app.listen(port || 3000, () => console.log(`listening on port ${port}!`))
