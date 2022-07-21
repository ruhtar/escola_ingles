const Router = require("express");
const router = Router();
const TurmaController = require("../controllers/TurmaController");
router.get("/turmas", TurmaController.pegaTodasAsTurmas);
router.get("/turmas/:id", TurmaController.pegaUmaTurma);
router.post("/turmas", TurmaController.criarTurma);
router.put("/turmas/:id", TurmaController.atualizarTurma);
router.delete("/turmas/:id", TurmaController.deletarTurma);
module.exports = router;
