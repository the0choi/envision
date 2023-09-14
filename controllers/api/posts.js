const Post = require("../../models/post");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");
const Clarifai = require('clarifai');
const cloudinary = require('cloudinary').v2;

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
    const clarifai = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });
    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    // Find image url
    const post = await Post.findById(req.params.id);
    const image = post.photo;

    // Pass image to Clarifai to obtain image description tags
    const clarifaiResponse = await clarifai.models.predict(Clarifai.GENERAL_MODEL, image);
    const concepts = clarifaiResponse.outputs[0].data.concepts;
    const description = concepts.map(concept => concept.name).join(', ');

    // Provide image tags to chatGPT to obtain description of image
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant specialising in artwork analysis and interpretation."},
        {"role": "user", "content": `An image artwork has been generated with AI from a prompt provided by a user. The prompt is as follows: ${post.prompt}. Using image recognition software, the image has been noted to have the following attributes: ${description}. Please provide a description of the image with the information provided and ensure your description is 100 words or less and divide your sentences into paragraphs.`},
      ],
    });

    res.json(gptResponse.choices[0].message);

  } catch (error) {
    console.error("Error during OpenAI call:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  }
}