const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')

const corsOptions = {
  origin:"https://savan-mern-site.netlify.app",
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
    .then(() => console.log("Database connected successfully"))
    .catch(error => console.error(error))
}); 

