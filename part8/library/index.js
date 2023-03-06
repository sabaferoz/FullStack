const { ApolloServer } = require('@apollo/server')
const { ApolloServerErrorCode } = require('@apollo/server/errors')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { ObjectId } = require('mongodb');

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]! 
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}


  type Query {
     bookCount: Int!
     authorCount: Int!
     allBooks(author: String, genre: String): [Book!]!
     allAuthors: [Author!]!
     me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    bookCount: async() => await Book.collection.countDocuments(),
    authorCount:async () => await Author.collection.countDocuments(),
    allBooks:async (root,args) => {
        if(!args.author && !args.genre){
            return await Book.find({}).populate("author")
        }
        if(!args.genre){
            const author= await Author.findOne({name: args.author})
            return Book.find({ author: { $in: author.id } }).populate("author")
        
        }
        if(!args.author){
           return Book.find({ genres: { $in: args.genre } }).populate("author");
        }
        const author= await Author.findOne({name: args.author})
        return Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author");
        
        
    },
    allAuthors: async() => {
        const authors=await Author.find({})
        const books=await Book.find({}).populate("author")
        return authors.map(author=>{
            const bookCount= (books.filter (book => book.author.name === author.name).length)
            return {"name": author.name, "bookCount": bookCount, "born": author.born}
        
        })
    },
    me: (root, args, context) => {
      console.log("current user",context.currentUser)
    return context.currentUser
  },
  },
  Mutation: {
    addBook: async(root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      console.log("author", author)
      if(!author){
        author= new Author({name: args.author})
        try {
          await author.save();
        } catch (error) {
          
              throw new GraphQLError('Saving author failed. The name of the author should be 5 characters or long.', {
  extensions: {
    code: error.extensions?.code,
    invalidArgs: args.author,
    error
  },
});
          
        }
        
      }
        console.log("else", args.title)
      const book = new Book({ ...args, author: author})
      console.log(book)
      try {
          await book.save();
        } catch (error) {

          
          throw new GraphQLError('Saving book failed. The name of the title should be uniqie and 5 characters or long.', {
  extensions: {
    code: error.extensions?.code,
    invalidArgs: args.title,
            error
  },
});
        }
      return book
    },
    editAuthor: async(root, args,context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
    let author = await Author.findOne({ name: args.name })
    console.log("author", author)
    if (!author) {
      return null
    }
    console.log(args.setBornTo)
    const updatedAuthor =  { ...author._doc, born: args.setBornTo }
    console.log("updated author:", updatedAuthor)
    await Author.findOneAndUpdate({name: args.name}, updatedAuthor, {new: true})
    author= await Author.findOne({ name: args.name })
    console.log("updated author new", author)
    return author
  },
  createUser: async (root, args) => {
    console.log(args.favoriteGenre)
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })        
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  },
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})