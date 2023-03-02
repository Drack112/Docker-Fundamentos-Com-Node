import { Router, Request, Response } from "express";
import cache from "express-redis-cache";

import PostController from "../Controllers/PostController";
import { loggerPino } from "../Utils/logger";

const redisClient = cache({
  host: "redis",
  port: 6379,
  prefix: "test",
  expire: 60,
});

redisClient.on("connected", function () {
  loggerPino.info("😎 Redis Cache Connected!");
});

redisClient.on("message", function (message) {
  loggerPino.info(message);
});

redisClient.on("deprecated", function (deprecated) {
  loggerPino.warn("deprecated warning", {
    type: deprecated.type,
    name: deprecated.name,
    substitute: deprecated.substitute,
    file: deprecated.file,
    line: deprecated.line,
  });
});

const postController = new PostController();

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Hello Dev!🌸" });
});

routes.post("/posts", postController.createPost);
routes.get(
  "/posts",
  redisClient.route({ name: "GetPosts" }),
  postController.getPosts,
);
routes.get(
  "/posts/:id",
  redisClient.route({ name: "GetPostsById" }),
  postController.getPost,
);
routes.put("/posts/:id", postController.updatePost);
routes.delete("/posts/:id", postController.deletePost);

export default routes;
