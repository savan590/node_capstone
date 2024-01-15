const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
// const bcrypt = require('bcrypt')
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority';

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')

const corsOptions = {
  origin:"https://savan-mern-site.netlify.app",
  // other CORS options...
};

app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);

app.get("/", async(req, res)=>{
  res.status(200).json("Server is up and running")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Server running on http://localhost:${PORT}`))
    .catch(error => console.error(error))
}); 

//
//public api
// app.get("/", (req, res) => {
//   res.json({
//     status: 'success',
//     message: 'welcome to the server'
//   })
// });

// const User = mongoose.model('User', {
//     name: String,
//     email: String,
//     mobile: String,
//     password: String,
// });

// const Job = mongoose.model('Job',{
//     company_name : String,
//     add_logo_url : String,
//     job_position : String,
//     monthly_salary : Number,
//     job_type : String,
//     location : String,
//     job_description : String,
//     about_company : String,
//     skills_required : String,
//     information : String
// })
  
//   //all users api
//   app.get('/users', async (req, res) => {
//     try {
//       const users = await User.find({})
//       res.json({
//         status: 'SUCCESS',
//         data: users
//       })
//     } catch (error) {
//       res.json({
//         status: 'FAILED',
//         message: 'Something went wrong'
//       })
//     }
//   })
  
//   //signup api
 
  
//   // Middleware for authentication and authorization
//   const authenticate = (req, res, next) => {
//     try {
//       const { jwttoken } = req.header('Authorization');
//       const decoded = jwt.verify(jwttoken, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.error(error);
//       res.json({ message: 'Invalid token' });
//     }
//   };
  
// //  protected route
//   app.get('/profile', authenticate, async (req, res) => {
//     res.send('WELCOME TO YOUR PROFILE!')
//   });