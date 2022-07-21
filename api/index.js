const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000 || process.env.PORT;
routes(app);
app.listen(port, () =>
  console.log(`Servidor aberto! Rodando em http://localhost:${port}`)
);

module.exports = app;
