const blog = require("../models/blog");
const { mapReduce } = require("../models/blog");

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
 
 var count = blogs.reduce(function (accumulator, blog) {
  return accumulator + blog.likes;
 }, 0);
  console.log(count)
  return count
}

const favoriteBlog = (blogs) => {
    var fav = blogs.reduce(function (currentFav, blog) {
  return (currentFav.likes || 0) >= blog.likes ? currentFav : blog;
}, {});
  console.log('fav blog', fav)
  return fav
}

const topBlogsAuthor = (blogs) => {
    var topBlog = blogs.reduce(function (currentTopBlog, blog) {
  return (currentTopBlog.blogs || 0) >= blog.blogs ? currentTopBlog : blog;
}, {});
  console.log('top blog', topBlog)
const author={author: topBlog.author, blogs: topBlog.blogs}
  return author
}

const topLikesAuthor = (blogs) => {
    var topLikes = blogs.reduce(function (currentTopLikes, blog) {
  return (currentTopLikes.likes || 0) >= blog.likes ? currentTopLikes : blog;
}, {});
  console.log('top likes', topLikes)
const author={author: topLikes.author, likes: topLikes.likes}
  return author
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  topBlogsAuthor,
  topLikesAuthor
}