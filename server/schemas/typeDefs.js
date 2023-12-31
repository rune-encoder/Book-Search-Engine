const typeDefs = `#graphql

    type User {
        _id: ID
        username: String!
        email: String
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        title: String!
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
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        deleteBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;
