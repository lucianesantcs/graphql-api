const classSchema = require('./schema/class.graphql');
const classResolvers = require('./resolvers/classResolvers.graphql');
const ClassAPI = require('./datasource/class');

module.exports = {
  classSchema,
  classResolvers,
  ClassAPI
}