const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const listingRoute = require("./Routes/listing");
const reviewsRoute = require("./Routes/review");
const userRoute = require("./Routes/user");
const User = require("./models/userSchema");

const app = express();

/* View engine & middleware */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Database connection */
const dbUrl = process.env.MONGO_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* Session store */
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(flash());

/* Passport configuration */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Flash & current user */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

/* Routes */
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);

/* Error handler */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});

// /* Server */
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

