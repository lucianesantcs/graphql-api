const { SQLDataSource } = require('datasource-sql');

class RegistrationAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.Resposta = {
      mensagem: ''
    }
  }

  async registerStudent(ids) {
    const newRegistration = {
      estudante_id: ids.estudante,
      turma_id: ids.turma,
      status: "confirmado"
    }

    await this.db.insert(newRegistration)
      .into('matriculas');
    
    this.Resposta.mensagem = "matrícula confirmada";
    return this.Resposta;
  }

  async getRegistrationByClass(idTurma) {
    const registrations = await this.db
      .select('*')
      .from('matriculas')
      .where({ turma_id: idTurma })
    
    return registrations;
  }
}

module.exports = RegistrationAPI;