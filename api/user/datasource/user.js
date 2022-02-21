const { RESTDataSource } = require("apollo-datasource-rest");

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  async getUsers() {
    // return this.get("/users");
    const users = await this.get("/users");
    return users.map(async user => ({
      id: user.id,
      nome: user.nome,
      email: user.email,
      ativo: user.ativo,
      role: await this.get(`/roles/${user.role}`) // pegar o objeto correspondente de acordo com a query
    }))
  }

  async getUserById(id) {
    // return this.get(`/users/${id}`);
    const user = await this.get(`/users/${id}`);
    user.role = await this.get(`/roles/${user.role}`);
    return user;
  }
}

module.exports = UsersAPI;