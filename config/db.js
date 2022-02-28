const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://" + process.env.PASS + "@cluster0.tigor.mongodb.net/mern_projectDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true,
        // useFindAndModify:false
    }
).then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log("faield connection to MongoDB", err));