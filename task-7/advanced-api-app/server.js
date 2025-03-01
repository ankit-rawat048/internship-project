const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const rateLimit = require("express-rate-limit");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: "mysecret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Server running
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));


const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configure Passport with Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Google Login Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("✅ Google Login Successful!");
  }
);


// Fetch weather data
app.get("/weather", async (req, res) => {
    try {
      const city = req.query.city || "Delhi";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });



// Apply rate limit (max 10 requests per minute)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests
    message: "⚠️ Too many requests, please try again later.",
  });
  
  app.use("/weather", limiter);