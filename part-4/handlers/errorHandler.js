const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      return response.status(400).json({ error: 'Username must be unique' });
    } else if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' });
    }
  
    // Default to internal server error
    response.status(500).json({ error: 'Something went wrong' });
  };
  
  module.exports = errorHandler;
  