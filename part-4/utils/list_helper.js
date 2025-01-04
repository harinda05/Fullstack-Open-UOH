const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum +  (blog.likes || 0), 0);
};

module.exports = totalLikes;
  
  module.exports = {
    dummy,
    totalLikes
  }