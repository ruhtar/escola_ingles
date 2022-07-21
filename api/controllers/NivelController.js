const database = require("../models"); //Acha o index.js por padrão do javascript

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    //static para não precisar instanciar uma nova classe new PessoaController para usar os seus métodos. Pode chamar os métodos direto
    try {
      const todosOsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmNivel(req, res) {
    try {
      const { id } = req.params;
      const umNivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umNivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async atualizarNivel(req, res) {
    const { id } = req.params;
    const atualizacaoNivel = req.body;
    try {
      const nivelAtualizado = await database.Niveis.update(atualizacaoNivel, {
        where: { id: id },
      });
      const novoNivelAtualizado = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(novoNivelAtualizado);
    } catch {
      return res.status(500).json(error.message);
    }
  }
  static async deletarNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.destroy({ where: { id: id } });
      return res
        .status(200)
        .json(
          `A pessoa de id ${id} foi deletada com sucesso do banco de dados`
        );
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
