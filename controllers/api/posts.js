const Post = require("../../models/post");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

module.exports = {
  index,
  show,
  create,
  generateImage,
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

async function show(req, res) {
  try {
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
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
