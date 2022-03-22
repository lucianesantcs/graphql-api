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
    turmas: (root_, __, { dataSources }) => dataSources.classAPI.getClasses()
  }
}

module.exports = classResolvers;