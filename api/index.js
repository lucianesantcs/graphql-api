const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const userSchema = require("./user/schema/user.graphql");
const userResolvers = require("./user/resolvers/userResolvers");
const UsersAPI = require("./user/datasource/user");

const classSchema = require("./class/schema/class.graphql");
const classResolvers = require("./class/resolvers/classResolvers");

const typeDefs = mergeTypeDefs([userSchema, classSchema]);
const resolvers = [userResolvers, classResolvers];

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI()
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`servidor rodando na porta ${url}`); 
});
