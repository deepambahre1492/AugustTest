const mongoose = require("mongoose");
dotenv = require("dotenv");
dotenv.config();


/*--------------For Local--------------*/
mongoose
    .connect(
        process.env.MONGODB_LOCAL_URI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });


/*--------------For Cloud--------------*/
/*mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true })
.then(() => {
  console.log("database connected successfully");
})
.catch((err) => {
  console.log(err.message);
});*/