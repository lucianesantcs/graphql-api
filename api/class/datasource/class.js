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
}

module.exports = ClassAPI;