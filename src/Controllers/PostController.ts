import { Request, Response } from "express";

import Post from "../Schemas/Post.Schema";

class PostController {
  async getPosts(request: Request, response: Response) {
    try {
      const posts = await Post.find();
      return response.status(200).json({
        status: "Success!",
        data: {
          posts,
        },
      });
    } catch (err) {
      return response
        .status(400)
        .json({ message: "👮‍♀️ Error in get the posts!", error: err });
    }
  }

  async createPost(request: Request, response: Response) {
    const { title, body } = request.body;

    try {
      const newPost = await Post.create({
        title: title,
        body: body,
      });
      return response.status(201).json(newPost);
    } catch (err) {
      return response
        .status(400)
        .json({ message: "👮‍♀️ Error in publish a post!", error: err });
    }
  }

  async getPost(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const post = await Post.findById(id);

      return response.status(200).json({
        status: "Success!",
        data: {
          post,
        },
      });
    } catch (err) {
      return response
        .status(400)
        .json({ message: "👮‍♀️ Error in get a post by ID!", error: err });
    }
  }

  async updatePost(request: Request, response: Response) {
    const { id } = request.params;
    const { title, body } = request.body;

    try {
      const updatePost = await Post.findByIdAndUpdate(id, {
        title: title,
        body: body,
      });
      return response.status(200).json(updatePost);
    } catch (err) {
      return response
        .status(400)
        .json({ message: "👮‍♀️ Error in update a post!", error: err });
    }
  }

  async deletePost(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const getAndDeletePost = await Post.findByIdAndDelete(id);

      return response.status(204).json(getAndDeletePost);
    } catch (err) {
      return response
        .status(400)
        .json({ message: "👮‍♀️ Error in delete a post!", error: err });
    }
  }
}

export default PostController;
