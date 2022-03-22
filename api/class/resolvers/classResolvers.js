// const turmas = [
//   {
//     id: 1,
//     descricao: "básico"
//   },
//   {
//     id: 2,
//     descricao: "intermediário"
//   }
// ]


const classResolvers = {
  Query: {
    turmas: (root_, __, { dataSources }) => dataSources.classAPI.getClasses(),
    turma: (root_, { id }, { dataSources }) => dataSources.classAPI.getClass(id)
  }
}

module.exports = classResolvers;