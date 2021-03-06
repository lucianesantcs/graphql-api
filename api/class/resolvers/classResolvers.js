const { GraphQLScalarType } = require("graphql")

const classResolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),

  Query: {
    turmas: (root_, args, { dataSources }) => dataSources.classAPI.getClasses(args),
    turma: (root_, { id }, { dataSources }) => dataSources.classAPI.getClass(id)
  },

  Mutation: {
    incluiTurma: (_, { turma }, { dataSources }) => dataSources.classAPI.addClass(turma),
    atualizaTurma: (_, novosDados, { dataSources }) => dataSources.classAPI.updateClass(novosDados),
    deletaTurma: (_, { id }, { dataSources }) => dataSources.classAPI.deleteClass(id)
  },

  Turma: {
    matriculas: (root, _, { dataSources }) => dataSources.registrationAPI.getRegistrationByClass(root.id),
    docente: (root, _, { dataSources }) => dataSources.usersAPI.getUserById(root.docente_id)
  },
}

module.exports = classResolvers;