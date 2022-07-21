const database = require("../models"); //Acha o index.js por padrão do javascript

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    //static para não precisar instanciar uma nova classe new TurmaController para usar os seus métodos. Pode chamar os métodos direto
    try {
      const todasAsTurmas = await database.Turmas.findAll();
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmaTurma(req, res) {
    try {
      const { id } = req.params;
      const umaTurma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criarTurma(req, res) {
    const novaTurma = req.body;
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma);
      return res.status(200).json(novaTurmaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async atualizarTurma(req, res) {
    const { id } = req.params;
    const atualizacaoTurma = req.body;
    try {
      const TurmaAtualizada = await database.Turmas.update(atualizacaoTurma, {
        where: { id: id },
      });
      const novaTurmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(novaTurmaAtualizada);
    } catch {
      return res.status(500).json(error.message);
    }
  }
  static async deletarTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.destroy({ where: { id: id } });
      return res
        .status(200)
        .json(`A Turma de id ${id} foi deletada com sucesso do banco de dados`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
