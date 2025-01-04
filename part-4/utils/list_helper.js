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
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }