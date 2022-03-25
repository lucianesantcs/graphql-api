const { SQLDataSource } = require('datasource-sql');
const DataLoader = require('dataloader');

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

  getRegistrationByStudent = new DataLoader( async idsEstudantes => {
    const registrations = await this.db
      .select('*')
      .from('matriculas')
      .whereIn('estudante_id', idsEstudantes)
      .select()
    
    return idsEstudantes.map(id => registrations.filter(registration => registration.estudante_id === id));
  });

  async deleteRegistration(idMatricula) {
    await this.db('matriculas')
      .where({ id: Number(idMatricula) })
      .del()
    
    this.Resposta.mensagem = "registro deletado"
    return this.Resposta;
  }

  async cancelRegistration(idMatricula) {
    await this.db
      .update({ status: "cancelado" })
      .where({ id: Number(idMatricula) })
      .into('matriculas')
    
    this.Resposta.mensagem = "matrícula cancelada"
    return this.Resposta;
  }
}

module.exports = RegistrationAPI;