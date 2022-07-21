const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();
router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criarPessoa);
router.put("/pessoas/:id", PessoaController.atualizarPessoa);
router.delete("/pessoas/:id", PessoaController.deletarPessoa);
router.get(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.pegaUmaMatricula
);
router.post(
  "/pessoas/:estudanteId/matriculas",
  PessoaController.criarMatricula
);
router.put(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.atualizarMatricula
);
router.delete(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.deletarMatricula
);
module.exports = router;
