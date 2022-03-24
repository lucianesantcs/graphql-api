const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const path = require('path');

const { userSchema, userResolvers, UsersAPI } = require('./user');
const { classSchema, classResolvers, ClassAPI } = require('./class');
const { registrationSchema, registrationResolvers, RegistrationAPI } = require('./registration');

const typeDefs = mergeTypeDefs([userSchema, classSchema, registrationSchema]);
const resolvers = [userResolvers, classResolvers, registrationResolvers];

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
      classAPI: new ClassAPI(dbConfig),
      registrationAPI: new RegistrationAPI(dbConfig)
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`servidor rodando na porta ${url}`); 
});
