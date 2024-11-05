const createServer = require("./src/app");
const config = require("./src/config");
const server = createServer();
const PORT = config.PORT || 3000;

const main = async () => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};

main();
