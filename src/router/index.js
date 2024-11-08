const express = require("express");

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-pCH2DGqAoOC1c4YWlWEHVR-N3zO69v4HrAwnekONADamuC-r_J-TL7qTwppY9VZREzt1yPflyxhb/pub?gid=829639545&single=true&output=csv";

const LIST_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-pCH2DGqAoOC1c4YWlWEHVR-N3zO69v4HrAwnekONADamuC-r_J-TL7qTwppY9VZREzt1yPflyxhb/pub?gid=774231375&single=true&output=csv";

const apiRouter = (server) => {
  const router = express.Router();
  server.use("/api", router);

  router.get("/data", async (req, res) => {
    const FECHA = "08-11-2024";
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
      res.status(500).json({ error: "Error al obtener datos" });
    }
  });
  router.get("/list", async (req, res) => {
    try {
      const response = await fetch(LIST_URL);
      const resText = await response.text();
      const arrList = resText.split("\r\n").slice(1);
      const data = arrList.map((row) => {
        const arrRow = row.split(",");
        const item = {
          referencia: arrRow[0],
          descripcion: arrRow[1].trim(),
          price: Number(arrRow[2]),
          stock: Number(arrRow[3]),
          brand: arrRow[4].trim().toUpperCase(),
          images: arrRow[5].split(";").map((image) => image.replace('"', "")),
        };
        return item;
      });

      data.sort((a, b) => b.referencia.localeCompare(a.referencia));

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error al obtener datos" });
    }
  });
};

module.exports = apiRouter;
