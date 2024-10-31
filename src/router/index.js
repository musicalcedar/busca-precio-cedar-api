const express = require("express");

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRtnrRx7rPw8Fg8iWZKqY99wTA1QuPAZT7bCfLTn6f5LMCkU0lWmikWdLk8g7YFenowC8pvCvzqf_GG/pub?gid=1914106577&single=true&output=csv";

const LIST_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRtnrRx7rPw8Fg8iWZKqY99wTA1QuPAZT7bCfLTn6f5LMCkU0lWmikWdLk8g7YFenowC8pvCvzqf_GG/pub?gid=506519268&single=true&output=csv";

const apiRouter = (server) => {
  const router = express.Router();
  server.use("/api", router);

  router.get("/data", async (req, res) => {
    const FECHA = "31-10-2024";
    try {
      const response = await fetch(DB_URL);
      const resText = await response.text();
      const arrProduct = resText.split("\r\n").slice(1);

      const data = arrProduct.map((row) => {
        const arrRow = row.split(",");
        const product = {
          bodega: arrRow[0],
          referencia: arrRow[1],
          descripcion: arrRow[2].trim(),
          saldo: arrRow[3],
          precio: Number(arrRow[5]),
          totalProductos: 0,
        };

        return product;
      });

      res.status(200).json({ data, fecha: FECHA });
    } catch (err) {
      console.log(err);
      return [];
    }
  });
  router.get("/list", async (req, res) => {
    try {
      const response = await fetch(LIST_URL);
      const resText = await response.text();
      const arrList = resText.split("\r\n").slice(2);
      const data = arrList.map((row) => {
        const arrRow = row.split(",");
        const item = {
          referencia: arrRow[0],
          descripcion: arrRow[1].trim(),
        };
        return item;
      });

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return [];
    }
  });
};

module.exports = apiRouter;
