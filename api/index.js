const { ApolloServer } = require("apollo-server");
const userSchema = require("./user/schema/user.graphql");

const users = [
  {
    nome: "Ana",
    ativo: true,
  },
  {
    nome: "Marcia",
    ativo: false,
  },
];

const typeDefs = [userSchema];
const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => { // listen({ port: 4001 }) adiciona porta customizada
  console.log(`servidor rodando na porta ${url}`); // padrão porta 4000
});
