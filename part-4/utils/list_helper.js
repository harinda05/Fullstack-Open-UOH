const _ = require('lodash');

const dummy = () => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum +  (blog.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((favBlog, currentBlog) => {
        return currentBlog.likes > favBlog.likes ? currentBlog : favBlog;
    });
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    };
};


const mostBlogs = (blogs) => {

    const groupedBlogs = _.groupBy(blogs, 'author');
    const topAuthor = _.maxBy(Object.entries(groupedBlogs), ([author, blogs]) => blogs.length);

    return {
        author: topAuthor[0],
        blogs: topAuthor[1].length,
    };
};


const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author');
      const totalLikesPerAuthor = _.mapValues(groupedBlogs, (blogs) => {
      return _.sumBy(blogs, 'likes');
    });
  
    const topAuthor = _.maxBy(Object.entries(totalLikesPerAuthor), ([author, likes]) => likes);
  
    return { author: topAuthor[0], likes: topAuthor[1] };
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }