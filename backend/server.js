const Express = require("express");
const dotenv = require("dotenv");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");


dotenv.config();

// express app
const app = Express();

//middlewares  

// to access the body of the request
app.use(Express.json());
// request logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// routes
app.use('/api/workouts', workoutRoutes);

// connect to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
})
.catch(err =>{
    console.log(err);
})

