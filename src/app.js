const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const staffRoutes = require("./routes/staff.routes");
const governingRoutes = require("./routes/governing.routes");
const imageRoutes = require("./routes/image.routes");
const noticeRoutes =require("./routes/notice.routes")
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/governing",governingRoutes);
app.use("/api/notice", noticeRoutes); 
app.use("/api/image",imageRoutes)

module.exports = app;
