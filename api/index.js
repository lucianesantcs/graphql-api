const { ApolloServer } = require("apollo-server");
const userSchema = require("./user/schema/user.graphql");
const userResolvers = require("./user/resolvers/userResolvers");
const UsersAPI = require("./user/datasource/user");

const typeDefs = [userSchema];
const resolvers = [userResolvers];

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI()
    }
  }
});

server.listen().then(({ url }) => { // listen({ port: 4001 }) adiciona porta customizada
  console.log(`servidor rodando na porta ${url}`); // padrão porta 4000
});
