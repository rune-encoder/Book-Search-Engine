const typeDefs = `#graphql

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        #bookCount: Int
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input savedBook {
        authors: [String]
        description: String
        title: String
        bookId: ID
        image: String
        link: String
    }

    type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    deleteBook(bookId: ID!): User
    }

    #input LoginInput {
       # identifier: String!  # This can be either an email or username
       # password: String!
    #}
`;

module.exports = typeDefs;
