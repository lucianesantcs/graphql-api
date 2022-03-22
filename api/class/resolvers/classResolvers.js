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
    turmas: (root_, __, { dataSources }) => dataSources.classAPI.getClasses(),
    turma: (root_, { id }, { dataSources }) => dataSources.classAPI.getClass(id)
  },

  Mutation: {
    incluiTurma: (_, { turma }, { dataSources }) => dataSources.classAPI.addClass(turma),
    atualizaTurma: (_, novosDados, { dataSources }) => dataSources.classAPI.updateClass(novosDados),
    deletaTurma: (_, { id }, { dataSources }) => dataSources.classAPI.deleteClass(id)
  }
}

module.exports = classResolvers;