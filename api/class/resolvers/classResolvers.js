const turmas = [
  {
    id: 1,
    descricao: "básico"
  },
  {
    id: 2,
    descricao: "intermediário"
  }
]

const classResolvers = {
  Query: {
    turmas: (root, args, context, info) => turmas
  }
}

module.exports = classResolvers;