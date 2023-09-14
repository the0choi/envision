const cloudinary = require('cloudinary').v2;
const Post = require("../../models/post");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

module.exports = {
  index,
  userIndex,
  show,
  create,
  generateImage,
  deletePost,
  interpret
};

async function create(req, res) {
  try {
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );

    const post = await Post.create({
      ...req.body,
      user: decodedToken.user._id,
      name: decodedToken.user.name
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    let posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function userIndex(req, res) {
  try {
    let posts = await Post.find({user: req.params.id});
    res.json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function generateImage(req, res) {
  try {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    cloudinary.uploader.upload(response.data[0].url, function(error, result) {
      console.log(result, error);
      res.json(result.url);
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function interpret(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    

    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const response = await openai.Completion.create({
      engine: "davinci",
      prompt: `Describe the image with these attributes: ${description}`,
      max_tokens: 150
  })
    

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}