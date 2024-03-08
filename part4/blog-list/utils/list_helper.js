const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let favoriteSoFar = blogs[0];
  for (let blog of blogs) {
    if (blog.likes > favoriteSoFar.likes) {
      favoriteSoFar = blog;
    }
  }

  return favoriteSoFar;
};

const mostBlogs = (blogs) => {
  const res = _(blogs)
    .groupBy((x) => x.author)
    .map((value, key) => ({ author: key, blogs: value.length }))
    .sortBy((y) => y.blogs)
    .value();

  return res.at(res.length - 1);
};

const mostLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  const res = _(blogs)
    .groupBy((x) => x.author)
    .map((value, key) => ({ author: key, likes: value.reduce(reducer, 0) }))
    .sortBy((y) => y.likes)
    .value();

  return res.at(res.length - 1);
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
