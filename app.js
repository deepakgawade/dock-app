const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/useRoutes");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const redis = require("ioredis");
const cors = require("cors");

const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
  username: "",
  password: "",
});

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", (error) => {
  console.log("Redis connection error :", error);
});

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRety = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Succesfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRety, 5000);
    });
};

connectWithRety();

app.enable("trust_proxy");
app.use(cors({}));
app.use(
  session({
    secret: SESSION_SECRET,
    // create new redis store.
    store: new RedisStore({
      client: redisClient,
    }),

    cookie: {
      maxAge: 30000 * 2,
      saveUninitialized: false,
      secure: false,
      httpOnly: true,
      resave: false,
    },
  })
);

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h1>Hi!!!,Welcome to Docker learning!! </h1>");
});
const port = process.env.PORT || 3000;

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`listenning on port ${port}!`);
});
