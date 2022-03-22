const { SQLDataSource } = require('datasource-sql');

class ClassAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
  }

  async getClasses() {
    return this.db
      .select('*')
      .from('turmas')
  }

  async getClass(id) {
    const getClass = await this.db
      .select('*')
      .from('turmas')
      .where({ id: Number(id) })
    return getClass[0]
  }
}

module.exports = ClassAPI;