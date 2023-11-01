const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const db = require("./config/connection");

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  introspection: true,
});


const startApolloServer = async () => {
  await server.start();
  
  // Apply Apollo Server middleware to the "/graphql" path
  server.applyMiddleware({ app });

  // Parse JSON and URL-encoded data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve static assets in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    
    // Route all requests to the React app's HTML file for client-side routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  // Set up your database connection
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
