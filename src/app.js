const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const staffRoutes = require("./routes/staff.routes");
const governingRoutes = require("./routes/governing.routes");
const imageRoutes = require("./routes/image.routes");
const noticeRoutes = require("./routes/notice.routes");

const app = express();

// parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// CORS: allow both localhost (dev) and live frontend
const allowedOrigins = [
  "http://localhost:5173",                  // local dev
  "https://satarapolytechnicsatara.com"    // live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

// test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/governing", governingRoutes);
app.use("/api/notice", noticeRoutes); 
app.use("/api/image", imageRoutes);

module.exports = app;