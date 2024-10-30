const createServer = require("./src/app");
const server = createServer();
const PORT = process.env.PORT || 3000;

const main = async () => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
