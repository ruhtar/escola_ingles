const database = require("../models"); //Acha o index.js por padrão do javascript

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    //static para não precisar instanciar uma nova classe new PessoaController para usar os seus métodos. Pode chamar os métodos direto
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params;
      const umaPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criarPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async atualizarPessoa(req, res) {
    const { id } = req.params;
    const atualizacaoPessoa = req.body;
    try {
      const pessoaAtualizada = await database.Pessoas.update(
        //O método update do sequelize não retorna nada. apenas 0 ou 1.
        //Para dar algum retorno ao usuário, fiz um método abaixdo para mostrar na tela a Pessoa atualizada.
        atualizacaoPessoa,
        {
          where: { id: id },
        }
      );
      const novaPessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(novaPessoaAtualizada);
    } catch {
      return res.status(500).json(error.message);
    }
  }
  static async deletarPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: id } });
      return res
        .status(200)
        .json(
          `A pessoa de id ${id} foi deletada com sucesso do banco de dados`
        );
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  //Os métodos CRUD de matrículas estarão associados as parâmetros de pessoas, como mostra o endpoint abaixo
  //http://localhost:3000/pessoas/1/matriculas/5
  //http://localhost:3000/pessoas/:estudanteId/matriculas/:matriculaId
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: matriculaId,
          estudante_id: estudanteId,
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.send(500).json(error.message);
    }
  }

  static async criarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: estudanteId };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const atualizacaoMatricula = req.body;
    try {
      await database.Matriculas.update(atualizacaoMatricula, {
        where: {
          estudante_id: estudanteId,
          id: matriculaId,
        },
        //O método update do sequelize não retorna nada. apenas 0 ou 1.
        //Para dar algum retorno ao usuário, fiz um método abaixdo para mostrar na tela a Pessoa atualizada.
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: matriculaId,
        },
      });
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: {
          id: matriculaId,
          estudante_id: estudanteId,
        },
      });
      return res
        .status(200)
        .json(
          `A matricula de id ${matriculaId} foi deletada com sucesso do banco de dados`
        );
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
