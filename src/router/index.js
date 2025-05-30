const express = require("express");

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTRPq2HqQ39BAI1YVFknOrY3CrV7uHw6ueNt0JEbZ3Xf6b3tFniFO9X-rfRBfn3aT4iPpqrJeGwHEjI/pub?gid=676197371&single=true&output=csv";

const LIST_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTRPq2HqQ39BAI1YVFknOrY3CrV7uHw6ueNt0JEbZ3Xf6b3tFniFO9X-rfRBfn3aT4iPpqrJeGwHEjI/pub?gid=1379199468&single=true&output=csv";

const apiRouter = (server) => {
  const router = express.Router();
  server.use("/api", router);

  router.get("/data", async (req, res) => {
    const FECHA = "30-05-2025";
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
          images: arrRow[6].split(";").map((image) => image.replace('"', "")),
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
