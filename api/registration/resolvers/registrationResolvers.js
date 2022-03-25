const { GraphQLScalarType } = require("graphql");

const registrationResolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),

  Mutation: {
    matricularEstudante: (_, ids, { dataSources }) => dataSources.registrationAPI.registerStudent(ids),
    deletarMatricula: (_, { matricula }, { dataSources }) => dataSources.registrationAPI.deleteRegistration(matricula),
    cancelarMatricula: (_, { matricula }, { dataSources }) => dataSources.registrationAPI.cancelRegistration(matricula)
  },

  Matricula: {
    estudante: (root, _, { dataSources }) => dataSources.usersAPI.getUserById(root.estudante_id),
    turma: (root, _, { dataSources }) => dataSources.classAPI.getClass(root.turma_id)
  }
}

module.exports = registrationResolvers;