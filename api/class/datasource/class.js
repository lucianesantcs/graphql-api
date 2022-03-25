const { SQLDataSource } = require('datasource-sql');
const DataLoader = require('dataloader');

class ClassAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);
    this.Resposta = {
      mensagem: ""
    }
  }

  getLoadedClasses = new DataLoader(async idsTurmas => {
    const turmas = await this.db
      .select('*')
      .from('turmas')
      .whereIn('id', idsTurmas)
    
    return idsTurmas.map(id => turmas.find(turma => turma.id === id));
  })

  async getClasses({ page = 0, pageOffset = Infinity }) {
    const initialRegister = page === 0 || page === 1
      ? 0
      : (page * pageOffset) - 1;
    
    return this.db
      .select('*')
      .from('turmas')
      .offset(initialRegister)
      .limit(pageOffset)
  }

  async getClass(id) {
    const getClass = await this.db
      .select('*')
      .from('turmas')
      .where({ id: Number(id) })
    return getClass[0]
  }

  async addClass(newClass) {
    const newClassId = await this.db
      .insert(newClass)
      .returning('id')
      .into('turmas')
    
    const insertedClass = await this.getClass(newClassId[0]);
    return ({ ...insertedClass })
  }

  async updateClass(newData) {
    await this.db
      .update({ ...newData.turma })
      .where({ id: Number(newData.id) })
      .into('turmas')
    
    const updatedClass = await this.getClass(newData.id)
    return ({
      ...updatedClass
    })
  }

  async deleteClass(id) {
    await this.db('turmas')
      .where({ id: id })
      .del()
    
    this.Resposta.mensagem = "registro deletado"
    return this.Resposta
  }

}

module.exports = ClassAPI;