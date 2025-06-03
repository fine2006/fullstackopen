const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map((element) => {
    likes += element.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let fav = { likes: 0 }
  blogs.map((element) => {
    if (element.likes >= fav.likes) {
      fav = element
    }
  })
  return fav
}

const mostBlogs = (blogs) => {
  const authorName = []
  const authorBlogs = []
  blogs.map((blog) => {
    const ind = authorName.findIndex((author) => author === blog.author)
    if (ind === -1) {
      authorName.push(blog.author)
      authorBlogs.push(1)
    } else {
      authorBlogs[ind] += 1
    }
  })
  const ans = {
    author:
      authorName[
        authorBlogs.findIndex((num) => num === Math.max(...authorBlogs))
      ],
    blogs: Math.max(...authorBlogs),
  }
  return ans
}

const mostLikes = (blogs) => {
  const authorName = []
  const authorLikes = []
  blogs.map((blog) => {
    const ind = authorName.findIndex((author) => author === blog.author)
    if (ind === -1) {
      authorName.push(blog.author)
      authorLikes.push(blog.likes)
    } else {
      authorLikes[ind] += blog.likes
    }
  })
  const ans = {
    author:
      authorName[
        authorLikes.findIndex((num) => num === Math.max(...authorLikes))
      ],
    likes: Math.max(...authorLikes),
  }
  return ans
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
