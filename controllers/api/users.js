const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt')

module.exports = {
  create,
  login,
  checkToken,
  checkUser
};

// Create a user
async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Log in a user
async function login(req, res) {
  try {
    const user = await User.findOne( {email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();

    const token = createJWT(user);
    res.json(token)

  } catch (err) {
    res.status(400).json(err);
  }
}

// Check token for logged in user
function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

// Find user in database
async function checkUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}