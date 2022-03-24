const registrationSchema = require('./schema/registration.graphql');
const registrationResolvers = require('./resolvers/registrationResolvers');
const RegistrationAPI = require('./datasource/registration');

module.exports = {
  registrationSchema,
  registrationResolvers,
  RegistrationAPI
}