const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const path = require('path');

const { userSchema, userResolvers, UsersAPI } = require('./user');
const { classSchema, classResolvers, ClassAPI } = require('.class');

const typeDefs = mergeTypeDefs([userSchema, classSchema]);
const resolvers = [userResolvers, classResolvers];

const dbConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, './data/database.db')
  }
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI(),
      classAPI: new ClassAPI(dbConfig)
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`servidor rodando na porta ${url}`); 
});
