const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
