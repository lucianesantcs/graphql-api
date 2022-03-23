const classSchema = require('./schema/class.graphql');
const classResolvers = require('./resolvers/classResolvers');
const ClassAPI = require('./datasource/class');

module.exports = {
  classSchema,
  classResolvers,
  ClassAPI
}