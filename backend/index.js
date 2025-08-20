const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

//routes
const loginRoute = require("./Route/loginRoute");
const adminadded = require("./Route/AdminContactRouter");
const logoutRoute = require("./Route/logoutRoute");
const userRoute = require("./Route/userContactRoute");


app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
  ],

  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello solar  Website");
});

app.use("/admin", loginRoute);
app.use("/contact", adminadded);
app.use("/admins", logoutRoute);
app.use("/usercontact", userRoute);




// MongoDB connection
const mongo_url =
  "mongodb+srv://karthickc726:Ehb5uR432nk4VVxw@cluster0.viysng1.mongodb.net/guru-uruthi?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("db connect");
    const port = 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error:" + error);
  });
