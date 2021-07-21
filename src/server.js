import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
//-----------------------------------------------------------
import experiencesRouter from "./services/experiences/experience.js";
//----------------------------------------------------------
import postsRouter from "./services/posts/post.js";
// import likesRouter from "./services/likes/likes.js";
//-----------------------------------------------------------
import profileRouter from "./services/profile/profile.js";
import commentsRouter from "./services/comments/comment.js";
import { notFoundErrorHandler, badRequestErrorHandler, catchAllErrorHandler } from "./errorMiddlewares.js";

const server = express();
const port = process.env.PORT || 3002

// ****************** MIDDLEWARES ****************************

server.use(express.json());
server.use(cors())

// ****************** ROUTES *******************************

server.use("/posts", postsRouter)
// server.use("/likes", likesRouter)
server.use("/profile", profileRouter)
server.use("/profile", experiencesRouter)
server.use("/comments", commentsRouter)


// ****************** ERROR HANDLERS ***********************

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)

console.table(listEndpoints(server));

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(port, () => {
      console.log("🧡 server is running on port ", port);
    })
  )
  .catch((err) => console.log(err));
